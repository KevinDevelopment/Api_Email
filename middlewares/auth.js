const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig.json");

module.exports = (request, response, next) => {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({
            error: "no token provided"
        })
    };

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        return response.status(401).json({
            error: "token error"
        })
    };

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return response.status(401).json({
            error: "token malformatted"
        })
    };

    jwt.verify(token, authConfig.secret, (err, decoded) => {

        if(err) {
            return response.status(401).json({
                error: "token invalid",
                erro: err
            })
        }       
        
        request.userId = decoded.id;
        return next()
    })

}