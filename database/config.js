const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '152122jlwa@',
    database:'funcionario',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
module.exports = pool