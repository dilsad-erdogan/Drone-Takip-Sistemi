const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');
const PilotCertificate = require('./PilotCertificate')
const Pilot = require('./Pilot')

const CertificatePermission = sequelize.define("certificate_permissions", {
    permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pilot_id: {
        type: DataTypes.INTEGER,
      },
      certificate_id: {
        type: DataTypes.INTEGER
      },
      
    certificate_file: {
        type: DataTypes.STRING, // Dosyanın yolunu ya da adını saklamak için string kullanılabilir
        allowNull: true // Opsiyonel olarak, bu alana bir dosya atanmayabilir
    },
      permission_status: {
        type: DataTypes.BOOLEAN
      },
      date_and_time: {
        type: DataTypes.DATE
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

module.exports = CertificatePermission;  