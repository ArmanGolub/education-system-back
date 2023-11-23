const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Document", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        taskId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
    });
};