const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "ExamenPractico1C",
    user: "root",
    password: "Ferñañdo13",
    database: "facedog"
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Users-Conexión a la BD establecida');
  });

  module.exports=db;