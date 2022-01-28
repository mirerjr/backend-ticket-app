class Ticket{
    id = null
    person_id = null
    ticket_type_id = null
    date_created = null
    description = null
    name = null
    open = null
    important = null

    constructor(person, ticket_type, description, name, important){
        this.person_id = person
        this.ticket_type_id = ticket_type
        this.date_created = new Date()
        this.description = description
        this.name = name
        this.open = true
        this.important = important
    }


}