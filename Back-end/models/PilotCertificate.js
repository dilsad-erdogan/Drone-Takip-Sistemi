const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const PilotCertificate = sequelize.define("pilot_certificates", {
    certificate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      certificate_name: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

module.exports = PilotCertificate;  