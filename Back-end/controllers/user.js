const pool = require('../config/database.js');
const queries = require('../queries/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_TOKEN;

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    })
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUsersById, [id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    })
};

const addUser = async (req, res) => {
    const { roletype_id, name, email, password, pilot_certificate, drone_owner } = req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // E-posta zaten var mı kontrol et
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) throw error;
        else if (results.rows.length) {
            res.status(409).send("E-posta zaten mevcut.");
        } else {
            // Kullanıcıyı veritabanına ekle
            pool.query(queries.addUser, [roletype_id, name, email, hashPassword, pilot_certificate, drone_owner], (error, results) => {
                if (error) throw error;

                // JWT token oluştur
                const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });

                res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!", token });
            });
        }
    });
};

const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUsersById, [id], (error,results) => {
        if(error) throw error;
        else if(!results.rows.length){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.removeUser, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User removed successfully.");
        });
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {roletype_id, name, email, password, pilot_certificate, drone_owner, is_active} = req.body;
    
    pool.query(queries.getUsersById, [id], (error, results) => {
        if (error) throw error;
        else if (!results.rows.length){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.updateUser, [roletype_id, name, email, password, pilot_certificate, drone_owner, is_active, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User updated successfully.");
        });
    });
};

const updateUserIsActive = (req, res) => {
    const id = parseInt(req.params.id);
    const { is_active } = req.body;
    
    pool.query(queries.getUsersById, [id], (error, results) => {
        if (error) throw error;
        else if (!results.rows.length){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.updateUserIsActive, [is_active, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User isactive updated successfully.");
        });
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    pool.query(queries.getUserByEmail, [email], async (error, results) => {
        if (error) throw error;

        if (!results.rows.length) {
            res.status(401).json({ message: "Kullanıcı bulunamadı." });
        } else {
            const user = results.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Şifre eşleşirse, JWT token oluştur
                const token = jwt.sign({ email: email, userId: user.id }, secretKey, { expiresIn: '1hr' });

                res.status(200).json({ message: "Giriş başarılı!", token });
            } else {
                res.status(401).json({ message: "Şifre geçersiz." });
            }
        }
    });
};

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    removeUser,
    updateUser,
    updateUserIsActive,
    loginUser,
};