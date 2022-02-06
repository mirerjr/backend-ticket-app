const Database = require("../db/database");

class TicketType{
    id = null
    typeName = null
    
    constructor(data){
        Object.assign(this, data)
    }

    static async get(id){
        const database = new Database('ticket_type')
        const data = await database.selectById(id)

        if(data){
            return new this(data[0])  
        }  

        return null
    }

    static async findAll(){
        const database = new Database('ticket_type')
        const data = await database.select()

        if(data){
            const result = []
            
            data.forEach((row, index) => {
                result[index] = new this(row)
            })
            
            return result
        }

        return null
    }

    async save(){
        const database = new Database('ticket_type') 
        
        if(this.id){
            const result = await database.selectById(this.id)

            if(result){
                const fields = Object.keys(this).slice(1) 
                const values = Object.values(this).slice(1)

                return await database.update(this.id, fields, values)
            }
        }

        return await database.insert(['type_name'], [this.typeName])              
    }
}

module.exports = TicketType