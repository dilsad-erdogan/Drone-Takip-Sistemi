const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const Pilot = sequelize.define('pilots', {
    pilot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    pilot_certificate: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    }, { timestamps: false });
    
module.exports = Pilot;