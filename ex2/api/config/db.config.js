import pg from 'pg';
import dotenv from 'dotenv';
const { Client } = pg;
dotenv.config();

// Connect to database
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default client;
