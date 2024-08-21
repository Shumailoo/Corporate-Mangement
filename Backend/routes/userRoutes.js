const express = require('express');
const router = express.Router();
const UserController=require("../controllers/userController");

router.get("/users/:id",UserController.getUser);
router.get("/users",UserController.getUsers);
router.put("/users/:id",UserController.editUser);
router.put("/users/:id/password",UserController.editUserPassword);

module.exports = router;