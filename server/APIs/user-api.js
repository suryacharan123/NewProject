const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { userLogin, userRegistration, updateUserCart } = require("../Controllers/user-controller");
const usernameTaken = require("../Middleware/usernameTaken");
const verifyToken = require("../Middleware/verifyToken");
const userApp = express.Router();

// Login Route
userApp.post("/login", expressAsyncHandler(userLogin));

//Register Route
userApp.post("/register", usernameTaken,expressAsyncHandler(userRegistration))

//Update Cart
userApp.put("/update-cart",expressAsyncHandler(updateUserCart));

// Export userApi
module.exports = userApp;
