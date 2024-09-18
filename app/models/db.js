const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

// Open the MySQL connection
connection.connect((error)=>{
    if(error) console.log("MYSQL connection: " + error);
    else console.log("Successfully connected to the database");
});

setInterval(function () {
    connection.ping((err) => {
        if (err) throw err;
    })
}, 30000)

module.exports = connection;