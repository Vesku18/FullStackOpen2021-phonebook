const mongoose = require('mongoose')

password = 'fullstack12!!'
const url = 
`mongodb+srv://fullstack:${password}@cluster0.ghw53.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    date: Date,
    number: Number,
})

contactSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv.length == 3){
    Contact.find({}).then(result => {
        result.forEach(note => {
          console.log(note.id)
          console.log(note.name)
          console.log(note.date)
          console.log(note.number)
          console.log('kaikki', note)
        })
        console.log('ersult', result)
        mongoose.connection.close()
      })
}

if (process.argv.length==5){
    const name = process.argv[3]
    const number = process.argv[4]
    
    const newContact = new Contact({
        name: name,
        date: new Date(),
        number: number
    })

    newContact.save().then(response => {
        console.log('note saved')
        mongoose.connection.close()
    })
}   