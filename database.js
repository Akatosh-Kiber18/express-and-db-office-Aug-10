import pg from 'pg';
export const pool = new pg.Pool({
    user: 'todolist_app', //username
    host: '127.0.0.1',
    database: 'postgres',
    password: '12345678', //password
    port: 5432,
});