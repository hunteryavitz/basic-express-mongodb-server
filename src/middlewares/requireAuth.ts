const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (
    request: { headers: { authorization: string }, user: any },
    response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string }): any; new(): any } }
    }, next: () => void) => {

    const { authorization } = request.headers
    if (!authorization) {
        return response.status(401).send({ error: 'missing token' })
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(
        token,
        'secretsauce',
        async (error: Error, payload: { userId: string }) => {

        if (error) {
            return response.status(401).send({ error: 'invalid token' })
        }

        const { userId } = payload

        request.user = await User.findById(userId)
        next()
    })
}
