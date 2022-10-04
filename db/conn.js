const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME, 
    process.env.DATABASE_PASSWORD, {

        host: process.env.DATABASE_HOST,

        dialect: "mysql"

});

try {

    sequelize.authenticate();

    console.log("Conexão realizada com sucesso!");
    
} catch (error) {
    
    console.log("Tentativa de conexão falhou!");

    console.error(error);

}

module.exports = sequelize;