const Sequelize = require("sequelize");
const connection = require("../../../connection/connection");

const Users = connection.define('user_login', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Users.sync({force: false}).then(() => {
    console.log("created table users")
}).catch((erro) => {
    console.log(`Sorry, there was an error ${erro}`)
});

module.exports = Users;