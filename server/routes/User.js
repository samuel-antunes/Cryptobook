const express = require('express');
const router = express.Router();
const con = require('../config/db');


router.post('/register', (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    con.query("INSERT INTO user (username, password) VALUES (?, ?);",
    [username, password],
    (err, results) => {
        console.log(err);
        res.send(results);
    });
});

router.post('/login', (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    con.query("SELECT * FROM user WHERE username = ?;",
    username,
    (err, results) => {
        if(err){
            console.log(err);
        }
        if(results.length > 0){
            if(password == results[0].password){
                res.json({
                    loggedIn: true,
                    username: username
                })
            }else{
                res.json({
                    loggedIn: false,
                    message: "Wrong password"
                });
            }
        }else{
            res.json({
                loggedIn: false,
                message: "User doesn't exist"
            });
        }
    });
});

module.exports = router;