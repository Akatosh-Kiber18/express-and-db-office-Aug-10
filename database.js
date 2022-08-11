import pg from 'pg';
export const pool = new pg.Pool({
    user: '', //username
    host: '127.0.0.1',
    database: 'postgres',
    password: '', //password
    port: 5432,
});
