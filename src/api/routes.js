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

app.get('/ticket-logs', async (request, response) => {
    const logs = await TicketLog.findAll()

    if(logs){
        response.status(200).json(logs)
    } else {
        response.status(404).json({error: 'No ticket logs were found'})
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

app.get('/ticket-types', async (request, response) => {
    const types = await TicketType.findAll()

    if(types){
        response.status(200).json(types)
    } else {
        response.status(404).json({error: 'No ticket types were found'})
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

module.exports = { app, port }

