const Database = require("../db/database");

class TicketType{
    id = null
    typeName = null
    
    constructor(name){
        this.typeName = typeName
    }
    }

    async save(){
        const database = new Database('ticket_type') 
        return await database.insert(['name'], [this.name])              
    }

}

module.exports = TicketType