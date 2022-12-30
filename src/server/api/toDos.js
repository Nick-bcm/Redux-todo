const express = require('express')

const { Todo } = require('../model')

const router = express.Router()

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const arr = [
  { title: 'Buy meat', isDone: false },
  { title: 'Read book', isDone: true },
  { title: 'Clean room', isDone: false },
]

Todo.insertMany(arr)

router.use(express.json())

router.use(async (req, res, next) => {
  console.log(`Time: ${Date.now()}, ${req.method}: ${req.originalUrl}`)
  await sleep(2000)
  next()
})

router.get('/', async (req, res) => {
  const all = await Todo.find()
  res.send(all)
})

router.post('/', async (req, res) => {
  const newTodo = await Todo.create({ title: req.body.title })
  res.send(newTodo)
})

router.patch('/:id', (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    { isDone: req.body.isDone },
    { new: true },
    (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.send(result)
      }
    },
  )
})

router.delete('/:id', async (req, res) => {
  const { acknowledged, deletedCount } = await Todo.deleteOne({ _id: req.params.id })

  if (!acknowledged || !deletedCount) {
    res.status(404).send({ error: 'Not Found' })
  } else {
    res.send(true)
  }
})

module.exports = router
