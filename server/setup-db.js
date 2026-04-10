import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function setupDatabase() {
  console.log('🔧 Setting up MySQL database...\n');

  // Connect without database selection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  try {
    // Read schema file
    const schemaPath = path.join(__dirname, 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Split by semicolons and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📊 Executing ${statements.length} SQL statements...\n`);

    for (const statement of statements) {
      try {
        await connection.query(statement);
        const preview = statement.substring(0, 60).replace(/\n/g, ' ');
        console.log(`✅ ${preview}...`);
      } catch (err) {
        if (err.code !== 'ER_DUP_ENTRY' && !err.message.includes('already exists')) {
          console.error(`⚠️  ${err.message.substring(0, 80)}`);
        }
      }
    }

    console.log('\n✅ Database setup completed successfully!');
    console.log(`\n📝 Database: ${process.env.DB_NAME || 'alphaaim_db'}`);
    console.log(`📍 Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '3306'}`);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    await connection.end();
  }
}

setupDatabase();
