import {pool} from "../database.js";

export function dashboardOnToday() {
    const date = new Date();
    const yesterday = new Date(date.setDate(date.getDate() - 1));
    const tomorrow = new Date(date.setDate(date.getDate() + 1));

    return pool
        .query(`SELECT COUNT(task)
                FROM lists
                WHERE due_date BETWEEN $1 AND $2`, [yesterday, tomorrow])
        .then(res => res.rows[0])
}
function groupTablesByList() {
    return pool
        .query('SELECT task FROM lists GROUP BY list')
        .then(res => console.log(res.rows))
}
groupTablesByList();