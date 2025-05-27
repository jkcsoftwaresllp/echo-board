const fs = require('fs');
const mysql = require('mysql2');

const schema = fs.readFileSync('./database/schema.sql', 'utf8');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySql',
  multipleStatements: true
});

connection.query(schema, (err, results) => {
  if (err) throw err;
  console.log('✅ Migration completed!');
  connection.end();
});
