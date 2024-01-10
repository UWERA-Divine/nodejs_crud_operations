const {Schema, model} = require('mongoose')


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A product must have name!'],
        max: 50,
        min: 4
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price'],
        min: 100
    },
    quantity: Number,
    expireDate: Date,
    featured: Boolean
})

const Product = model('Product', productSchema)
module.exports = Product