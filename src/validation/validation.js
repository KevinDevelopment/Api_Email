const express = require("express");
const router = express.Router();

module.exports = (params) => {
    var result = /\S+@\S+\.\S+/;
    return result.test(params);
};