const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = require("./User");

const Tought = db.define("Tought", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
});

// Um pensamento pertence a um único usuário
Tought.belongsTo(User);
// Um usuário possui vários pensamentos
User.hasMany(Tought);

module.exports = Tought;