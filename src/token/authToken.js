const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/authConfig.json");

module.exports = (params) => {
    return jwt.sign(params, authConfig.secret, {expiresIn: 86400})
};