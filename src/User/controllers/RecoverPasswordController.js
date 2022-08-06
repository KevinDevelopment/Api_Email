const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const crypto = require("crypto");
const mailer = require("../../modules/mailer")

router.post("/forgot_password", async (request, response) => {

    const {email} = request.body;

    try {

        const findUser = await User.findOne({
            attributes: ['id','nome','email','password'],
            where: {
                email: email
            }
        });

        if (!findUser) {
            return response.status(400).json({
                message: "user not found"
            })
        };

        const token = crypto.randomBytes(30).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.update({
            passwordResetToken: token,
            passwordResetExpires: now
        }, {
            where: {
                id: findUser.id
            }
        });

        mailer.sendMail({
            to: email,
            from: 'kevin@hoxtak.com',
            template: 'auth/forgot_password',
            context: {token},
        }, (err) => {

            if (err) {
                console.log(err)
                return response.status(400).json({
                    message: "cannot send forgot password email"
                })
            }

            return response.send({resp: "ok"});

        });

    } catch (erro) {

        
        return response.status(400).json({
            error: "erro on forgot password, try again",
            err: erro
        })
    }

})

module.exports = router;