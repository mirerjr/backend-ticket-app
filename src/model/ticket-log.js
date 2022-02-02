class TicketLog{
    id = null
    ticket_status_id = null
    ticket_id = null
    date = null
    status_changed = null
    commented = null
    escalated = null
    description = null

    constructor(ticket_status, ticket, status_changed, commented, escalated, description){
        this.ticket_status_id = ticket_status
        this.ticket_id = ticket
        this.date = new Date()
        this.status_changed = status_changed
        this.commented = commented
        this.escalated = escalated
        this.description = description
    }

}

module.exports = TicketLog