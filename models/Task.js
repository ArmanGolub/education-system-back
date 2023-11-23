const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Task", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          groupID: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          teacherID: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
    });
};