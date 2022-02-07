class Ticket{
    id = null
    personId = null
    ticketTypeId = null
    dateCreated = null
    description = null
    title = null
    open = null
    important = null

    constructor(person, ticket_type, description, title, important){
        this.person_id = person
        this.ticket_type_id = ticket_type
        this.date_created = new Date()
        this.description = description
        this.title = title
        this.open = true
        this.important = important
    }


}

module.exports = Ticket