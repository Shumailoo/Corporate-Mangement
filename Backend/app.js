// imports
const express=require("express");
const dotenv = require("dotenv");
const mongoose=require("mongoose");
const session=require("express-session");
// const cookieParser=require("cookie-parser");
const MongoStore=require("connect-mongo");
const cors=require("cors");
const parser=require("body-parser");

const mongoDbConnect=require("./config/db");
const authRoute=require("./routes/authRoutes");
const projectRoute=require("./routes/projectRoutes");
const employeetRoute=require("./routes/employeeRoutes");
const userRoute=require("./routes/userRoutes");
const {isAuthenticated}=require("./middlewares/authMiddleware");

// Configure dotenv to load variables from .env file
dotenv.config();
// Constants env
const PORT = process.env.PORT || 5000;
const db_url=process.env.DB_URL || "mongodb://127.0.0.1:27017/corprmgt";

// const store = new MongoStore({ // Create a new instance with the new keyword
//   uri: process.env.DB_URL,
//   collection: 'session',

// });

// define functions

function serverStart() {
  try {
    app.listen(PORT,()=>{
      console.log("Server started at port: ",PORT);
    });
  } catch (error) {
    console.log(error);
    console.log("Error listening on port: ",PORT);
  }
}
// // Custom middleware to handle session logic
// const sessionHandler = (req, res, next) => {
//   const newUserId = req.session.newUserId; // Assuming `newUserId` is set when user logs in
//   if (req.session.userId && req.session.userId === newUserId) {
//     console.log("Session already matches. No new session created.");
//   } else {
//     console.log("Session User ID mismatch. Creating a new session.");
//     req.session.regenerate((err) => {
//       if (err) {
//         return next(err);
//       }
//       req.session.userId = newUserId; // Assign new user ID to session
//       console.log("New session created with ID:", req.session.id);
//       next();
//     });
//     return; // Return to prevent the execution of next()
//   }
//   next();
// };


// server app
const app = express();

app.use(parser.urlencoded({extended:true}))
app.use(cors({
  origin:["http://localhost:5173","https://www.getpostman.com"],
  // origin:"*",
  methods:["GET,PUT,DELETE,POST"],
  credentials:true,
}));


// connect mongodb 
mongoDbConnect();

// middleware for json parser
app.use(express.json());

// middleware for session
// app.use(session({
//   name:"sessionCookie",
//   secret: process.env.SESSION_SECRET || 'supersecretkey',
//   saveUninitialized: false,
//   resave:false,
//   store:MongoStore.create({
//     mongoUrl:db_url,
//     collectionName:"sessions"
//   }),
//   cookie: {
//     maxAge: 1000 * 60 * 5 , //takes in milliseconds (1000 for 1 sec * 60sec in 1 min)
//     secure: false,
//     sameSite: "strict",
//   },
// }));
app.use(session({
  name: "sessionCookie",
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: db_url,
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes
    secure: false,
    sameSite: "strict",
  },
}));
app.use((req, res, next) => {
  // console.log(22,req.session);
  
  if (req.session.userId) {
    // Session with userId already exists, no need to create a new one
    console.log("Session with userId already exists:", req.session.userId);
    next();
  } else {
    if(req.session.isVerified){
      // No session with userId found, create a new one
      console.log("No session with userId found, creating a new one...");
      req.session.regenerate((err) => {
        if (err) {
          return next(err);
        }
        // Assign new user ID to session (assuming userId is passed in req.body)
        req.session.userId = req.body.userId || null; // Replace with actual userId logic
        console.log("New session created with ID:", req.session.id);
        next();
      });
    }
    next();
  }
});
// app.use((req, res, next) => {
//   console.log('Session ID:', req.sessionID);
//   next();
// });
// app.use(sessionHandler);

// app.use((req, res, next) => {
//   console.log('Session ID:', req.session.id);
//   console.log('Session User ID:', req.session.userId);
//   next();
// });
app.use("/api/auth",authRoute);
app.use("/api/project",isAuthenticated,projectRoute);
// app.use("/api/project",projectRoute);
app.use("/api/employee",isAuthenticated,employeetRoute);
// app.use("/api/employee",employeetRoute);
// app.use("/api/user",userRoute);
app.use("/api/user",isAuthenticated,userRoute);

serverStart();
