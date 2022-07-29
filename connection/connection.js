const Sequelize = require("sequelize");
const connection = new Sequelize('estudo', 'kevin', '12345', {
    host: "localhost",
    dialect: "mariadb",
    logging: false
});

connection.authenticate().then(() => {
    console.log("connection successfully established");
}).catch((erro) => {
    console.log(`Sorry, there was an error ${erro}`)
});

module.exports = connection;