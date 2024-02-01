require('dotenv').config();
// console.log('DB_HOST:', process.env.DB_HOST); 測試環境變數讀取

const mysql = require('mysql2/promise');

async function connectToMySQL() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  return connection;
}
module.exports = connectToMySQL;
