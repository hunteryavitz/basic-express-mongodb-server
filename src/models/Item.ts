const mongoose = require('mongoose')
const { Types } = mongoose.Schema;
const { ObjectId } = Types;

const itemSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

mongoose.model('Item', itemSchema)
