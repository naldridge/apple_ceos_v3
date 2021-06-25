'use strict';

const db = require('./conn');


class ExecutiveModel {
    constructor(id, name, slug, year) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.year = year;
    }

    static async getAll() {
        try {
            const response = await db.any(
                `SELECT * FROM ceos;`
                )
                return response;
        } catch (error) {
            console.error('Error: ', error);
            return error;
            }
    }

    static async getBySlug(slug) {
        try {
            const response = await db.one(
                `SELECT * FROM ceos
                WHERE slug = '${slug}';`
            );
            return response;
        } catch (error) {
            console.error('Error: ', error);
            return error;
        }
    }

    async addEntry() {
        try {
            const response = await db.result(
                `INSERT INTO ceos (name, slug, first_year_active) 
                VALUES 
                    ('${this.name}', '${this.slug}', ${this.year});`
            );
            return response;
        } catch (error) {
            console.error('Error: ', error);
            return error;
        }
    }

    async deleteEntry() {
        try {
            const response = await db.result(
                `DELETE FROM ceos WHERE id = $1;`, [this.id]
            );
            return response;
        } catch (error) {
            console.error('Error: ', error);
            return error;
        }
    }
}

module.exports = ExecutiveModel;