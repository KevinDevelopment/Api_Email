const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../Model/User");
const generateToken = require("../../token/authToken");

router.post("/register", async (request, response) => {
    
    const {nome, email, password} = request.body;
    const hash = await bcrypt.hash(password, 10);

    const findUser = await Users.findOne({
        raw: true,
        attributes: ['id','nome','email','password'],
        where: {
            email: email
        }
    });
    

    if(!findUser) {

        const user = await Users.create({

            nome: nome,
            email: email,
            password: hash

        }).then((user) => {

            return response.status(200).json({
                message: "user created",
                User: user,
                token: generateToken({id: Users.id})
            })

        }).catch((erro) => {

            return response.status(400).json({
                message: "sorry, there was an error",
                erro: erro
            })
        })
    }
    else {
        return response.status(400).json({
            message: "there is already an account with this email"
        })
    }

});

module.exports = router;