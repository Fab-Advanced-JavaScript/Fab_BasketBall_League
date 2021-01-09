const mysql = require("mysql");
const dotenv = require('dotenv').config({path : "./db_config.env"});

const getConnection = () =>{
    let connection = mysql.createConnection({
        "host": process.env.DB_HOST,
        "database": process.env.DB_NAME,
        "user" : process.env.DB_USER,
        "password" : process.env.DB_PASSWORD
    });
    connection.connect(err => {
        if(err) throw err;
        console.log("mySql has successfully connected....");
    })
    return connection;
}

exports.getConnection = getConnection;