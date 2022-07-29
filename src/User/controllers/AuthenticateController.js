const express = require("express");
const router = express.Router();
const Users = require("../Model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../token/authToken");

router.post("/login", async (request, response) => {

    const {email, password} = request.body;

    const verifyUser = await Users.findOne({
        attributes: ['id','nome','email','password'],
        where: {
            email: email
        }
    });

    if(!verifyUser) {
        return response.status(400).json({
            message: "user not found"
        })
    };

    const verifyPassword = await  bcrypt.compare(password, verifyUser.password);

    if(!verifyPassword) {
        return response.status(400).json({
            message: "invalid password"
        })
    };

    return response.status(200).json({
        user: verifyUser,
        token: generateToken({id:verifyUser.id})
    })

});

module.exports = router;