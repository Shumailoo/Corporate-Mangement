// imports
const express=require("express");
const dotenv = require("dotenv");
const mongoose=require("mongoose");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const cors=require("cors");
const parser=require("body-parser");

const mongoDbConnect=require("./config/db");
const authRoute=require("./routes/authRoutes");
const productRoute=require("./routes/productRoutes");
const employeetRoute=require("./routes/employeeRoutes");
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
app.use(cors());

// connect mongodb 
mongoDbConnect();

// middleware for json parser
app.use(express.json());

// middleware for session
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({
    mongoUrl:db_url,
    collectionName:"sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false,
    sameSite: "strict",
  },
}));

// app.use((req, res, next) => {
//   console.log('Session ID:', req.session.id);
//   console.log('Session User ID:', req.session.userId);
//   next();
// });
// app.use(sessionHandler);

// app.use((req, res, next) => {
//   console.log('Session ID:', req.session.id);
//   console.log('Session User ID:', req.session.userId);
//   next();
// });
app.use("/api/auth",authRoute);
app.use("/api/product",isAuthenticated,productRoute);
app.use("/api/employee",isAuthenticated,employeetRoute);

serverStart();
