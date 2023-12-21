require('./models/User')
require('./models/Item')
require('./models/geo/Track')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')
const trackRoutes = require('./routes/geo/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(itemRoutes)
app.use(trackRoutes)

interface IUser {
    email: string
    password: string
}

const mongoDbUri
    = 'mongodb+srv://<username>:<password>@<database>'

mongoose.connect(mongoDbUri)
    .then((response: string) => console.log('connected to mongodb: ' + response))
    .catch((error: Error) => console.log('Error connecting to mongodb', error))

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (error: any) => {
    console.log('Error connecting to MongoDB', error)
})

app.get('/', requireAuth, (request: { user: IUser }, response: { send: (arg0: string) => void }) => {
    response.send(`User email: ${request.user.email}`)
})

app.listen(3000, () => {
  console.log('Listening at port 3000!')
})
