const Database = require("../db/database")

class TicketLog{
    id = null
    ticketStatusId = null
    ticketId = null
    date = null
    statusChanged = null
    commented = null
    escalated = null
    description = null
    created = null
    closed = null

    constructor(data){
        Object.assign(this, data)
    }

    static async get(id){
        const database = new Database('ticket_log')
        const data = await database.selectById(id)

        if(data){
            return new this(data[0])
        }

        return null
    }

    static async findAll(){
        const database = new Database('ticket_log')
        const data = await database.select()
        const result = []

        if(data){
            data.forEach((row, index) => {
                result[index] = new this(row)
            })
        }

        return result
    }

    static async findAllByTicket(id){
        const database = new Database('ticket_log')
        const sql = "SELECT * FROM ticket_log WHERE ticket_id = $1 ORDER BY date DESC"
        const values = [id]
        const result = []
        
        const data = await database.query(sql, values)

        if(data){
            data.forEach((row, index) => {
                result[index] = new this(row)
            })
        }
           
        return result
    }

    async save(){
        const database = new Database('ticket_log')

        const fields = Object.keys(this).slice(1)
        const values = Object.values(this).slice(1)

        if(this.id){
            const result = await database.selectById(this.id)

            if(result){
                return await database.update(this.id, fields, values)
            }
        }

        return await database.insert(fields, values)
    }

}

module.exports = TicketLog