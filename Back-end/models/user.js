const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize  = require('../config/db');

const User = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roletype_id: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pilot_certificate: {
        type: DataTypes.STRING,
      },
      drone_owner: {
        type: DataTypes.BOOLEAN,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });
    
    User.beforeCreate(async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });
    
    User.prototype.comparePassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    
    User.prototype.getJwtToken = function () {
      return jwt.sign({ user_id: this.user_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
    };

    module.exports = User;    
    
/*     User.prototype.getResetPasswordToken = function () {
      const resetToken = crypto.randomBytes(20).toString("hex");
    
      this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
      this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 min
    
      return resetToken;
    }; */


