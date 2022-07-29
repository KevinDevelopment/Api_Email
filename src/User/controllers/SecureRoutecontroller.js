const express = require("express");
const router = express.Router();
const middleware = require("../../../middlewares/auth");

router.get("/secure", middleware, (request, response) => {
    response.send({resp: "acessou a  rota autenticada", user: request.userId})
})

module.exports = router;