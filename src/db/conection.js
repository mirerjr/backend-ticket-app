require('dotenv/config');

async function connect(){
    
    //Reusing an existing connection instead creating a new pool
    if(global.connection){
        return global.connection.connect();
    }

    const { Pool } = require('pg');
    
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });

    //Storing the pool for later use
    global.connection = pool;

    return pool.connect();
}

module.exports = { connect }