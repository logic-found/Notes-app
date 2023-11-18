const express = require("express");
const router = express.Router();
const controller = require("../Controller/User");

router
  .post("/signUp", controller.signUp)
  .post("/signIn", controller.signIn)
  .post("/logout", controller.logout)
  .delete('/deleteAllUsers', controller.deleteAllUsers)

exports.router = router
