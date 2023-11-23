// const {Schema, model} = require('mongoose');

// const TokenSchema = new Schema({
//     user: {type: Schema.Types.ObjectId, ref: 'User'},
//     refreshToken: {type: String, required: true},
// })

// module.exports = model('Token', TokenSchema);

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("RefreshToken", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        refreshToken: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });
};