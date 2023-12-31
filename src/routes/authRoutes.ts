const express = require("express")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (request: any, response: any) => {
    console.log('request.body', request.body)

    const { email, password } = request.body

    console.log('email', email)
    console.log('password', password)

    try {
        const user = new User({ email, password })
        const { _id, save } = user

        await user.save()

        console.log('saved')

        const token = jwt.sign({ userId: _id }, 'secretsauce')

        console.log('token', token)

        response.send({ token })
    } catch (error: any) {
        return response.status(422).send(error.message)
    }
})

router.post('/signin', async (request: { body: { email: any; password: any } },
                              response: { status: (arg0: number) => { (): any; new(): any
                                      send: { (arg0: { error: string }): any
                                          new(): any } }
                                  send: (arg0: { token: any }) => void }) => {

    const { email, password } = request.body
    if (!email || !password) {
        return response.status(422).send({ error: 'Must provide email and password' })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return response.status(404).send({ error: 'Invalid user' })
    }

    try {
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id }, 'secretsauce')
        response.send({ token })
    } catch (error) {
        return response.status(422).send({ error: 'Invalid password' })
    }
})

module.exports = router
