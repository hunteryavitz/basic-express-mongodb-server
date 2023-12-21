const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Item = mongoose.model('Item')

const router = express.Router()

router.use(requireAuth)

router.get('/items', async (request: { user: { _id: any} }, response: { send: (arg0: any) => void }) => {
    const items = await Item.find({ id: request.user._id })
    response.send(items)
})

router.post('/item', async (request: { body: { name: any; description: any; image: any }
                                user: { _id: any } },
                            response: { status: (arg0: number) => { (): any
                                    new(): any; send: { (arg0: { error: any }): void
                                        new(): any } }
                                send: (arg0: any) => void }) => {

        const { name, description, image } = request.body

        if (!name || !description || !image) {
            return response.status(422).send({ error: 'You must provide a name, description and image' })
        }

        try {
            const item = new Item({ id: request.user._id, name, description, image })
            await item.save()
            response.send(item)
        } catch (error: any) {
            response.status(422).send({ error: error.message })
        }
})

module.exports = router
