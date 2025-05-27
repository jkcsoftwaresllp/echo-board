const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const seedQuery = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySql',
  database: 'echoboard_db',
  multipleStatements: true   
});

// 🚀 Run the SQL query
connection.query(seedQuery, (err, results) => {
  if (err) throw err;
  console.log('Seeding completed.');
  connection.end();
});
