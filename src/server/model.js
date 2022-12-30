const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  date: { type: Date, default: Date.now },
  isDone: { type: Boolean, default: false },
})
todoSchema.set('toJSON', { virtuals: true })

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { todoSchema, Todo }
