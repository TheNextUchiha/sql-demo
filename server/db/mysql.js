const mysql = require('mysql');

// DB config
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sqldemo'
});

// DB Connection
db.connect((err) => {
    if(err) throw err;

    console.log('MySQL Online');
});

module.exports= {db};