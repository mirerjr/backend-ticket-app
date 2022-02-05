class Person{
    id = null
    fullName = null
    company = null
    phone = null
    email = null

    constructor(name, company, phone, email) {
        this.name = name
        this.company = company
        this.phone = phone
        this.email = email
    } 
}

module.exports = Person