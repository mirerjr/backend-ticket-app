const Database = require("../db/database")
const TicketLog = require("./ticket-log")

class Ticket{
    id = null
    personId = null
    ticketTypeId = null
    dateCreated = null
    description = null
    title = null
    open = null
    important = null

    constructor(data){
        Object.assign(this, data)
    }

    static async get(id){
        const database = new Database('ticket')
        const data = await database.selectById(id)

        if(data){
            return new this(data[0])
        }

        return null
    }

    static async findAll(){
        const database = new Database('ticket')
        const data = await database.select()
        const result = []

        if(data){
            data.forEach((row, index) => {
                result[index] = new this(row)
            })
        }

        return result
    }

    async save(){
        const database = new Database('ticket')

        const fields = Object.keys(this).slice(1)
        const values = Object.values(this).slice(1)

        if(this.id){
            const result = await database.selectById(this.id)

            if(result){
                return await database.update(this.id, fields, values)
            }
        }

        const result = await database.insert(fields, values)
        
        if(result){
            this.id = result.rows[0].id
            database.entity = 'ticket-log'

            const ticketLog = new TicketLog({                
                ticketId: this.id,
                date: new Date(),
                statusChanged: false,
                commented: false,
                escalated: false,
                description: "Ticket Criado",
                created: true,
                closed: false
            })
            
            await ticketLog.save()
        }
        
        return result
    }


}

module.exports = Ticket