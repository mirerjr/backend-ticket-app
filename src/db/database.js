const connection = require("./conection");

async function select(entity){
    const database = await connection.connect();
    const response = await database.query(`SELECT * FROM ${entity}`);
    
    return response.rows;
}

async function insert(entity, fields, values){
    const database = await connection.connect();
    const valueParams = getValueParamsList(values);
    const fieldParams = fields.join(',');
    const sql = `INSERT INTO ${entity}(${fieldParams}) VALUES (${valueParams});`;

    return await database.query(sql, values);
}

async function update(entity, fields, values, id){
    const database = await connection.connect();
    const idParam = `$${fields.length + 1}`;
    const fieldParams = getFieldParamsList(fields);
    const sql = `UPDATE ${entity} SET ${fieldParams} WHERE id=${idParam}`;

    return await database.query(sql, [...values, id]);
}


//Returns a list with params ($1, $2...) based on value lenght
function getValueParamsList(values){
    let params = [];

    for(let count = 0; count < values.length; count++){
        params.push(`$${count+1}`);
    }
 
    return params.join(',');
}

//Return a map with name of field as a key, and params ($1, $2...) as a value
function getFieldParamsList(fields){
    let params = [];

    for(let count = 0; count < fields.length; count++){
        params.push(`${fields[count]}=$${count+1}`);
    }

    return params.join(',');
}

module.exports = { select, insert, update }