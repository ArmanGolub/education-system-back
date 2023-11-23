const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("StudentGrade", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        grade: {
            type: Sequelize.FLOAT,
            allowNull: true
        }
    });
};