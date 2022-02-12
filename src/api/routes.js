require('dotenv/config')

const Ticket = require('../model/ticket')
const TicketLog = require('../model/ticket-log')
const TicketStatus = require('../model/ticket-status')
const TicketType = require('../model/ticket-type')
const Person = require('../model/person')

const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.API_PORT

app.use(express.json())
app.use(cors())


app.get('/tickets', async (request, response) => {
    const tickets = await Ticket.findAll()
    
    if(tickets){
        response.status(200).json(tickets)
    } else {
        response.status(404).json({error: 'No tickets were found'})
    }
})

app.get('/tickets/:id', async (request, response) => {
    const { id } = request.params
    const ticket = await Ticket.get(id)

    if(ticket){
        response.status(200).json(ticket)
    } else {
        response.status(404).json({error: 'Ticket not found'})
    }
})

app.get('/ticket-logs', async (request, response) => {
    const logs = await TicketLog.findAll()

    if(logs){
        response.status(200).json(logs)
    } else {
        response.status(404).json({error: 'No ticket logs were found'})
    }
})

app.get('/ticket-logs/:id', async (request, response) => {
    const { id } = request.params
    const ticketLog = await TicketLog.get(id)

    if(ticketLog){
        response.status(200).json(ticketLog)
    } else {
        response.status(404).json({error: 'Ticket log not found'})
    }
})

app.get('/ticket-status', async (request, response) => {
    const status = await TicketStatus.findAll()

    if(status){
        response.status(200).json(status)
    } else {
        response.status(404).json({error: 'No ticket status were found'})
    }
})

app.get('/ticket-status/:id', async (request, response) => {
    const { id } = request.params
    const ticketStatus = await TicketStatus.get(id)

    if(ticketStatus){
        response.status(200).json(ticketStatus)
    } else {
        response.status(404).json({error: 'Ticket status not found'})
    }
})

app.post('/ticket-status', async (request, response) => {
    const { statusName } = request.body
    const ticketStatus = new TicketStatus({statusName})
    
    const saved = await ticketStatus.save()

    if(saved){
        response.sendStatus(201)
    } else {
        response.sendStatus(400)
    }
})

app.get('/ticket-types', async (request, response) => {
    const types = await TicketType.findAll()

    if(types){
        response.status(200).json(types)
    } else {
        response.status(404).json({error: 'No ticket types were found'})
    }
})

app.get('/ticket-types/:id', async (request, response) => {
    const { id } = request.params
    const ticketType = await TicketType.get(id)

    if(ticketType){
        response.status(200).json(ticketType)
    } else {
        response.status(404).json({error: 'Ticket type not found'})
    }
})

app.get('/persons', async (request, response) => {
    const persons = await Person.findAll()

    if(persons){
        response.status(200).json(persons)
    } else {
        response.status(404).json({error: 'No persons were found'})
    }
})

app.get('/persons/:id', async (request, response) => {
    const { id } = request.params
    const person = await Person.get(id)

    if(person){
        response.status(200).json(person)
    } else {
        response.status(404).json({error: 'Person not found'})
    }
})

module.exports = { app, port }

