
require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
morgan.token('oma', function (req) {
  return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :oma'))


const requestLogger =(req,res,next) => {
  console.log(req.method + ':' + JSON.stringify(req.body) )
  next()}
app.use(requestLogger)


const Contact = require('./models/contact')

let persons  = []

///// ROUTET
const mainUrl = '/api'

app.get(`${mainUrl}/persons`, (req, res) => {
  Contact.find({}).then(c => {
    console.log(c.length,' records found')
    res.json(c)
  })
})

app.put(`${mainUrl}/persons/:id`, (req, res, next) => {
  const id = String(req.params.id)
  console.log(id, 'pitäs päivittää')
  const body = req.body
  const c = {
    name: body.name,
    number: body.number,
    data: new Date()
  }

  Contact.findByIdAndUpdate(id, c,{ new: true })
    .then(updatedNote => {
      console.log('Talletus onnistu', updatedNote)
      res.json(updatedNote)
    })
    .catch( error => {
      console.log('Ei onnistutnut talletus', error)
      next(error)
    })

})

app.post(`${mainUrl}/persons`, (req, res, next) => {
  console.log(`Let's add new person ${req.params} `)
  const body = req.body

  if(!body.name){
    return (res.status(400).json({
      error: 'No name'
    }))
  }

  if(!body.number){
    return(res.status(400).json({
      error:'No number'
    }))
  }

  console.log('Name and number exists')

  if(persons.filter(s => s.name === body.name).length !== 0){
    return ( res.status(400).json({
      error: 'name exists already'
    }))
  }

  console.log('Same name does not exists')

  console.log('Adding new item')

  const newPerson  = new Contact({
    name: body.name,
    date: new Date(),
    number: body.number
  })

  newPerson.save()
    .then(savedNewOne => {
      console.log('This saved:', savedNewOne)
      res.json(savedNewOne).end()
    })
    .catch(error => {
      console.log('Savesta tuli errori', error)
      next(error)
    })

})

app.get(`${mainUrl}/persons/:id`, (req, res, next) => {
  const id = String(req.params.id)
  console.log(`Let me have person data ${id}`)

  Contact.findById(id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        console.log('TÄHÄN EI VARMAAN KOSKAAN SAAVUTA')
        res.status(400).send({ error: 'Nothing there' })
      }
    })
    .catch( error => next(error))
})

app.delete(`${mainUrl}/persons/:id`, (req, res, next) => {
  const id = String(req.params.id)
  console.log(`Let's remove contact ${id}`)
  const contact = persons.filter(n => n.id === id)
  if (contact){
    persons = persons.filter(n => n.id !== id)
    Contact.findByIdAndRemove(req.params.id)
      .then(
        res.status(204).end()
      )
      .catch(error => next(error))
  }
  else
    res.status(404).end()
})

app.get('/api/info', (req,res) => {
  console.log('Give info table')

  const contactCount=persons.length
  const d = new Date()
  let time = d.toDateString() + ' ' + d.toTimeString()
  res.send(`<p> Phonebook has info for ${contactCount} contacts </p> <p>${time}</p>`)
})




// ERROR HANDLING
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Väärä formaatti' })
  }
  else if (error.name === 'ReferenceError') {
    return response.status(500).send({ error: 'Oikea formaatti mutta väärä osoitus' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})