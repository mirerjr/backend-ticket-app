require('dotenv/config')

const express = require('express')
const app = express()
const port = process.env.API_PORT

app.use(express.json())


app.get('/', (request, response) => {
    response.send('Hello World!')
})


app.listen(port, () => {
    console.log('Test')
})

