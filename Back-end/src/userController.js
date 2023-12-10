const pool = require('../database');
const queries = require('./queries');

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
}

const addUser = (req, res) => {
    const { roletype_id, name, email, password, pilot_certificate, drone_owner } = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(error) throw error;
        else if (results.rows.length) {
            res.send("Email already exists.");
        }

        pool.query(queries.addUser, [roletype_id, name, email, password, pilot_certificate, drone_owner], (error, results) => {
            if(error) throw error;
            res.status(201).send("User created successfully!");
        })
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

const updateActiveUser = (req, res) => {
    const id= parseInt(req.params.id);
    const { isactive } = req.body;

    pool.query(queries.getUsersById, [id], (error, results) => {
        if(error) throw error;
        else if(!results.rows.length){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.updateActiveUser, [isactive, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User updated successfully.");
        });
    });
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {roletype_id, name, email, password, pilot_certificate, drone_owner, user_id} = req.body;
    
    pool.query(queries.getUsersById, [id], (error, result) => {
        if (error) throw error;
        else if (!results.rows.length){
            res.send("User does not exist in the database.");
        }

        pool.query(queries.updateUser, [roletype_id, name, email, password, pilot_certificate, drone_owner, user_id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User updated successfully.");
        });
    });
}

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    removeUser,
    updateActiveUser,
    updateUser,
};