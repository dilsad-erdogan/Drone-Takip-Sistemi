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
      permission_status: {
        type: DataTypes.BOOLEAN
      },
      date_and_time: {
        type: DataTypes.DATE
      },
      pdf_data: {
        type: DataTypes.BLOB, 
        allowNull: true,
    },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

    //CertificatePermission.belongsTo(PilotCertificate, { foreignKey: 'certificate_id', targetKey: 'certificate_id' })
    //CertificatePermission.belongsTo(Pilot, {foreignKey: 'pilot_id', targetKey: 'pilot_id' })
module.exports = CertificatePermission;  