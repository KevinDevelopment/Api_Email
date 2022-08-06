const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");

router.post("/reset_password", async (request, response) => {

    const {email, token, password} = request.body;

    try {

        const findUser = await User.findOne({
            raw: true,
            attributes: ['id','nome','email','password','passwordResetToken','passwordResetExpires'],
            where: {
                email: email
            }
        });        

        

        if (!findUser) {
            return response.status(400).json({
                message: "user not found"
            })
        };


        if (token !== findUser.passwordResetToken) {
            return response.status(400).json({
                message: "token invalid"
            })
        };

        const now = new Date();

        if (now > findUser.passwordResetExpires) {
            return response.status(400).json({
                message: "token expired, generate a new one"
            })
        };

        const hash = await bcrypt.hash(password, 10);

        const alterUser = User.update({
            password: hash
        }, {
            where: {
                id: findUser.id
            }
        });

        response.send({resp: "ok reset"})


    } catch (err) {
        
        return response.status(400).json({
            message: "cannot reset password, try again",
            erro: err
        })
    };

});

module.exports = router;