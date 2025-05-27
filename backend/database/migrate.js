const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const runMigration = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySql', // update if needed
    multipleStatements: true
  });

  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  try {
    await connection.query(schema);
    console.log('✅ Migration successful');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await connection.end();
  }
};

runMigration();
