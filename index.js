
const cors = require('cors')

const express = require('express')

const app = express()

app.use(express.json())

app.use(cors())

var morgan = require('morgan')

morgan.token('oma', function (req, res) { 
  return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :oma'))


const requestLogger =(req,res,next) =>{ 
  console.log(req.method + ":" + JSON.stringify(req.body) )
  next()}

app.use(requestLogger)

let persons  = [
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "adfsasdfadsf",
        "number": "",
        "date": "2021-10-08T18:45:52.743Z",
        "id": 12
      },
      {
        "name": "sss",
        "number": "",
        "date": "2021-10-08T20:41:31.709Z",
        "id": 14
      }
]
  

const mainUrl = "/api"

app.get(`${mainUrl}/persons`, (req, res) => {
 console.log(`Let me have persons ${PORT}`)
 res.json(persons)
})

app.post(`${mainUrl}/persons`, (req, res) => {
  console.log(`Let's add new person ${req.params}}`)
  const body = req.body
  
  if(!body.name){
    return (res.status(400).json({
      error: "No name"
    })) 
  }

  if(!body.number){
    return(res.status(400).json({
      error:"No number"
    })) 
  }

  console.log(persons.filter(s => s.name === body.name))

  if(persons.filter(s => s.name === body.name).length != 0){
    return ( res.status(400).json({
      error: 'name exists already'
    }))
  }

  console.log("Adding new item")
  const newP = {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random()*100)
  }

  persons = persons.concat(newP)
  res.end()
})
 
app.get(`${mainUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id)
  console.log(`Let me have person data ${id}`)
  const contact = persons.filter(n => n.id === id)
  if (contact)
    res.json(contact)
  else
    res.status(404).end()

 })

 app.delete(`${mainUrl}/persons/:id`, (req, res) => {
  const id = Number(req.params.id)
  console.log(`Let's remove contact ${id}`)
  const contact = persons.filter(n => n.id === id)
  if (contact){
    persons = persons.filter(n => n.id != id)
    res.status(204).end()
  }  
  else
    res.status(404).end()

 })

app.get('/api/info', (req,res) => {
 console.log(`Give info table`)
 const contactCount=persons.length
 const d = new Date()
 let time = d.toDateString() + " " + d.toTimeString()
 res.send(`<p> Phonebook has info for ${contactCount} contacts </p> <p>${time}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
console.log(`Server running on port ${PORT}`)
})