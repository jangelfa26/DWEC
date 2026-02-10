const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'db-bibliteca.cqvaz99alebl.us-east-1.rds.amazonaws.com',
  port: 3306,
  database: 'bibliteca',
  user: 'admin',
  password: '#31M4R1An4', 
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

module.exports = pool;
