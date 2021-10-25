
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

const password = process.argv[2]
console.log("This is it:",password)
//const url = 
//`mongodb+srv://fullstack:${password}@cluster0.ghw53.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url)
    .then(result =>{
        console.log('connected to MONGODB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    date: Date,
    number: Number,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)