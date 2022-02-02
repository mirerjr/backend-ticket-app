const Database = require("../db/database");

class TicketType{
    id = null
    name = null
    
    constructor(name){
        this.name = name
    }

    async save(){
        const database = new Database('ticket_type') 
        return await database.insert(['name'], [this.name])              
    }

}

module.exports = TicketType