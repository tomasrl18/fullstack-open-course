/* const express = require('express')
const app = express()
require('dotenv').config()

const Note = require('./models/note')

const logger = require('./utils/logger')
const config = require('./utils/config')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.post('/api/notes', (request, response, next) => {
    const body = request.body
  
    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
  
    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body
  
    Note.findByIdAndUpdate(request.params.id, { content, important }, { new: true, runValidators: true, context: 'query' }) 
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
}) */

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})