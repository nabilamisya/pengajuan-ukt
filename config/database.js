const mysql = require('mysql');
require('dotenv').config();

// untuk konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "uiweb",
    port: "3306",
    multipleStatements: true
});

// koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('SERVER SEDANG BERJALAN.....');
    console.log("localhost:3000");
});

module.exports = koneksi;