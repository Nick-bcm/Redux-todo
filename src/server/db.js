const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod = null

const connectDB = async () => {
  try {
    let dbUrl = 'mongodb://username:password@localhost:27017'
    // if (process.env.NODE_ENV === 'test') {
    mongod = await MongoMemoryServer.create()
    dbUrl = mongod.getUri()
    // }

    const conn = await mongoose.connect(dbUrl, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.connection.close()
    if (mongod) {
      await mongod.stop()
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = { connectDB, disconnectDB }
