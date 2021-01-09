const mysql = require("mysql");
const dotenv = require('dotenv').config({path : "./db_config.env"});

class LoginTaskManager {

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
    // this get data from playerlist table
    allPlayer(callback) {
        let sql = "select * from playerlist";
        this.runSql(sql, undefined, callback)
    }

    getLoginData(req, res) {
        // const userName = req.body.username;
        // const password = req.body.password;
        // destructuring ...
        const {username, password} = req.body;
        let userInfo = req.body
        console.log(userInfo);
        let infoData = ' <span> A user has submitted a form </span>';
        res.send(infoData);
    }
}

module.exports = LoginTaskManager;