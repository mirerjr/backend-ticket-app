
module.exports = class Database {
    #connection = null;
    entity = null;

    constructor(entity){
        this.#connection = require("./conection");
        this.entity = entity
    }

    async select(){
        const database = await this.#connection.connect();
        const response = await database.query(`SELECT * FROM ${this.entity} ORDER BY id DESC`);

        database.release();
        return response.rows;
    }

    async insert(fields, values){
        const database = await this.#connection.connect();
        const valueParams = this.#getValueParamsList(values);
        const fieldParams = fields.join(',');
        
        const sql = `INSERT INTO ${this.entity}(${fieldParams}) VALUES (${valueParams});`;
        const result = await database.query(sql, values);

        database.release();
        return result;        
    }

    async update(id, fields, values){
        const database = await this.#connection.connect();
        const idParam = `$${fields.length + 1}`;
        const fieldParams = this.#getFieldParamsList(fields);

        const sql = `UPDATE ${this.entity} SET ${fieldParams} WHERE id=${idParam}`;
        const result = await database.query(sql, [...values, id]);

        database.release();
        return result;
    }

    //Returns a list with params ($1, $2...) based on value lenght
    #getValueParamsList(values){
        let params = [];

        for(let count = 0; count < values.length; count++){
            params.push(`$${count+1}`);
        }

        return params.join(',');
    }

    //Return a map with name of field as a key, and params ($1, $2...) as a value
    #getFieldParamsList(fields){
        let params = [];

        for(let count = 0; count < fields.length; count++){
            params.push(`${fields[count]}=$${count+1}`);
        }

        return params.join(',');
    }
}