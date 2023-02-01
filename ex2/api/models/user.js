import client from '../config/db.config.js';

export class User {
    #email;
    #password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static #getSaveQuery() {
        return `INSERT INTO users (email, password) VALUES ('${this.email}', '${this.password}')`;
    }

    static #getFindQuery(field, value) {
        return `SELECT * FROM users WHERE ${field} = '${value}' LIMIT 1`;
    }

    static #getUpdateQuery(id, field, value) {
        return `UPDATE users SET ${field} = '${value}' WHERE id = ${id}`;
    }

    static #getDeleteQuery(id) {
        return `DELETE FROM users WHERE id = ${id}`;
    }

    static async save() {
        const queryString = this.#getSaveQuery();
        await client.query(queryString);
    }

    static async findFirst(field, value) {
        const queryString = this.#getFindQuery(field, value);
        const result = await client.query(queryString);
        return result.rows[0];
    }

    static async findByIdAndUpdate(id, field, value) {
        const queryString = this.#getUpdateQuery(id, field, value);
        await client.query(queryString);
        const updatedUser = await this.find_first('id', this.id);
        return updatedUser;
    }

    static async findByIdAndDelete() {
        const queryString = this.#getDeleteQuery();
        await client.query(queryString);
    }
}