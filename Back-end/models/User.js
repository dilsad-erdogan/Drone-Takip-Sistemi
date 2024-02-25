const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const sequelize  = require('../config/db');
const Drone = require('./Drone');

const User = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roletype_id: {
        type: DataTypes.INTEGER,
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
     
      drone_owner: {
        type: DataTypes.BOOLEAN,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      reset_password_token: {
        type: DataTypes.STRING,
      },
      reset_password_expire: {
        type: DataTypes.DATE,
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
    
    User.prototype.getResetPasswordToken = async function () {
      try {
        const resetToken = crypto.randomBytes(20).toString("hex");
    
        this.reset_password_token = crypto
          .createHash("sha256")
          .update(resetToken, "utf-8")
          .digest("hex");
    
        this.reset_password_expire = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika
        return resetToken;
      } catch (error) {
        console.error("Error in getResetPasswordToken:", error);
        throw error;
      }
    };
    
    //User.hasMany(Drone, { foreignKey: 'owner_id' });
module.exports = User;