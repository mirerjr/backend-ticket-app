const Database = require("../db/database")

class Person{
    id = null
    fullName = null
    company = null
    phone = null
    email = null

    constructor(data) {
        Object.assign(this, data)
    }
    
    static async get(id){
        const database = new Database('person')
        const data = await database.selectById(id)

        if(data){
            return new this(data[0])
        }

        return null
    }

    static async findAll(){
        const database = new Database('person')
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
        const database = new Database('person')

        const fields = Object.keys(this).slice(1)
        const values = Object.values(this).slice(1)

        if(this.id){
            const result = await database.selectById(this.id)

            if(result){
                return await database.update(this.id, fields, values)
            }
        }

        const result = await database.insert(fields, values)         
        return result.rows[0].id

    } 
}

module.exports = Person