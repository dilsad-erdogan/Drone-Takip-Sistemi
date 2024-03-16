const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const RoleType = sequelize.define("role_types", {
    roletype_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_type: {
        type: DataTypes.STRING,
      },
      explanation: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

module.exports = RoleType;   