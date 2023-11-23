const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Op = Op;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, DataTypes);
db.Group = require("./Group")(sequelize, DataTypes);
db.Task = require("./Task")(sequelize, DataTypes);
db.StudentGrade = require("./StudentGrade")(sequelize, DataTypes);
db.Document = require("./Document")(sequelize, DataTypes);
db.RefreshToken = require("./RefreshToken.js")(sequelize, DataTypes);

module.exports = db;