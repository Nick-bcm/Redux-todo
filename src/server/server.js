const express = require('express')
const path = require('path')

const { PORT } = require('../settings')
const todos = require('./api/toDos')

const { connectDB, disconnectDB } = require('./db')

const app = express()

connectDB()

app.set('port', process.env.PORT || PORT)

app.use('/', express.static(path.resolve('../../public')))
app.use('/api/todos', todos)

const server = app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`)
})

// setInterval(
//   () =>
//     server.getConnections((err, connections) =>
//       console.log(`${connections} connections currently open`)
//     ),
//   1000
// )

function shutDown() {
  console.log('Received kill signal, shutting down gracefully')
  server.close(() => {
    console.log('Closed out remaining connections')
    disconnectDB()
    process.exit(0)
  })

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
