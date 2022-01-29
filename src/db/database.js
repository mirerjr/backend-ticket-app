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
    const valueList = values;

    return await database.query(sql, valueList);
}


//Returns a list with params ($1, $2...) based on value lenght
function getValueParamsList(values){
    let params = [];

    for(let count = 0; count < values.length; count++){
        params.push(`$${count+1}`);
    }
 
    return params.join(',');
}

module.exports = { select, insert }