const mysql = require("mysql");
const dotenv = require('dotenv').config({path : "./db_config.env"});
const bcrypt = require('bcryptjs');

class SignUpTaskManager {

    getConnection() {
        let connection = mysql.createConnection({
            "host": process.env.DB_HOST,
            "database": process.env.DB_NAME,
            "user" : process.env.DB_USER,
            "password" : process.env.DB_PASSWORD
        });
        return connection;
    }

    checkConnection() {
        let connection = this.getConnection()
        connection.connect(err => {
            if(err) throw err;
        console.log("mySql has successfully connected....");
        })
    }
    runSql(sql, param, callback) {
        let connection = this.getConnection();
        connection.query(sql, param, (err, data) => {
            if(err) throw err
            callback(data);
        })
    }

    getSignUpData(req, res) {
        // const userName = req.body.username const password = req.body.password;
        // destructuring ...
        const {first_name, last_name, email, password, password_confirm} = req.body;
        let sql = "select email from users where email=?";
        this.runSql(sql, [email], (err, data) => {
            if(err) throw err;
            console.log("do you get here");
            // if(data.length > 0) {
            //     return res.render('pages/signup', { message: 'That email already exist'})
            // } else if (password != password_confirm) {
            //     return res.render('pages/signup', { message: 'The Password entered does not match'});
            // }
            // let hashedPass = await bcrypt.hash(password, 8)
            // console.log(hashedPass);
        });
       
    }
}

module.exports = SignUpTaskManager;