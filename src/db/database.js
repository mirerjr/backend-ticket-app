
module.exports = class Database {
    #connection = null;
    entity = null;
    fields = null
    values = null

    constructor(entity){
        this.#connection = require("./conection");
        this.entity = entity;
    }

    async select(){
        const database = await this.#connection.connect();
        const response = await database.query(`SELECT * FROM ${this.entity} ORDER BY id DESC`);
        const data = this.#formatSnakeToCamelCase(response.rows);

        database.release();
        return data;
    }

    async selectById(id){
        const database = await this.#connection.connect();
        const sql = `SELECT * FROM ${this.entity} WHERE id=$1`;
        const values = [id];
        const result = await database.query(sql, values);

        const data = this.#formatSnakeToCamelCase(result.rows);

        database.release();
        return data;
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
        this.fields = this.#formatFieldsToSnakeCase(fields);

        const database = await this.#connection.connect();
        const idParam = `$${this.fields.length + 1}`;
        const fieldParams = this.#getFieldParamsList(this.fields);

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

    #formatFieldsToSnakeCase(camelFields){
        const fields = camelFields;

        return fields.map((field, line) => {
            return field.split('').map((character, index) => {
                if(character == character.toUpperCase()){
                    return '_' + character.toLowerCase() 
                }
                return character
            }).join('');
        });
    }      

    #formatSnakeToCamelCase(snakeRows){
        return snakeRows.map((row) => {
            const camelRow = {}
            const values = Object.values(row)
            const keys = Object.keys(row).map((field) => {

                return field.split('_').map((word, index) => {                    
                    if(index == 0){
                        return word 
                    }
                    
                    if(index > 0) {
                        let camelWord = ''                        
                        camelWord += word.at(0).toUpperCase()
                        camelWord += word.split('').splice(1).join('')
                        return camelWord
                    }                  
                }).join('')
            })

            keys.forEach((key, index) => {
                camelRow[key] = values[index]
            })            

            return camelRow
        });  
    }
}