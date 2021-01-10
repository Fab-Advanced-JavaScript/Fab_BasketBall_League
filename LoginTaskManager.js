// const dotenv = require('dotenv').config({path : "./db_config.env"});
const mysql = require('./mysql_config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let connection  = mysql.getConnection()
let sql = "";
let title = "Draft Login Page"
let headerTitle = "Draft Login";
let message = "";

class LoginTaskManager {
    //..
    // runSql(sql, param, callback) {
    //     connection.query(sql, param, (err, data) => {
    //         if(err) throw err
    //         callback(data);
    //     })
    // }
    //...
    getLoginData(req, res) {
    
        const {email, password} = req.body;
        if(!email && !password) {
            message = 'Please Enter an email and a password';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        } else if (!email && password) {
            message = 'Provide an Email';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        }  else if (email && !password) {
            message = 'Provide an Email or a Password';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        }
        sql = "SELECT * FROM users WHERE email = ?";
        connection.query(sql, [email], async(err, data) => {
            console.log('sql data : ' + data);
            // if(err) throw err;
            //..
            if(!data || !(await bcrypt.compare(password, data[0].password))) {
                message = "Email or Password is Incorrect"
                res.status(401).render('pages/login', { title: title, header:headerTitle, message:message})
            } else {
                const id = data[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
                console.log('token is: ' + token);
                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), httpOnly: true
                }
                // httpOnly: true means that we set our cookie if we are only in the browser environment
                res.cookie('jwt', token, cookiesOptions); // set up the cookie in the browser
                res.status(200).redirect('/draft');
                
            }

        });
    }
        // this.runSql(sql, [email], async (callback));
        // this.runSql(sql, [email], async(callback) => {
        //     console.log('sql data : ' + data);
        //     if(!data || !(await bcrypt.compare(password, data[0].password))) {
        //         message = "Email or Password is Incorrect"
        //         res.status(401).render('pages/login', { title: title, header:headerTitle, message:message})
        //     }

        // })
        
        
}

module.exports = LoginTaskManager;