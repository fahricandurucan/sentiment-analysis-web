import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';


// Bağlantı bilgilerini kontrol et
const requiredEnvVars = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE', 'MYSQL_PORT'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const pool = mysql.createPool({
    port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  queueLimit: 0,
  connectTimeout: 10000,
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), 'ca.pem'), 'utf8')  
  }
});

pool.getConnection()
  .then(connection => {
    console.log('Database connection successful');
    console.log('Connection details:', {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE
    });
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    console.error('Connection details:', {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE
    });
  });

export default pool; 