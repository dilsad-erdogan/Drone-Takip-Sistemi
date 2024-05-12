const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');
const User = require('./User')

const Pilot = sequelize.define('pilots', {
    pilot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pilot_certificate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificate_file: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    }, { timestamps: false });

Pilot.belongsTo(User, {foreignKey: 'user_id', targetKey: 'user_id'})    
module.exports = Pilot;