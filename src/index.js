const express = require("express");
const app = express();
const connection = require("../connection/connection");
const Users = require("./User/Model/User");
const RegisterController = require("./User/controllers/RegisterController");
const AuthenticateController = require("./User/controllers/AuthenticateController");
const SecureRouteController = require("./User/controllers/SecureRoutecontroller");
const RecoverPasswordController = require("./User/controllers/RecoverPasswordController");
const ResetPasswordController = require("./User/controllers/ResetPasswordController");


//express settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//express routes
app.use("/", RegisterController);
app.use("/", AuthenticateController);
app.use("/", SecureRouteController);
app.use("/", RecoverPasswordController);
app.use("/", ResetPasswordController);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});