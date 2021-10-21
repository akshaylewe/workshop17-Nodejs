const express = require('express')
const mongoose = require('mongoose')
const User = require('./model')
const app = express()
app.use(express.json())
mongoose
  .connect(
    'mongodb+srv://abc:abc@cluster0.dvael.mongodb.net/new_user?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log('DB connected...'))
  .catch(err => console.log(err))
app.post('/post', async (req, res) => {
  const { username, password, confirm_password, mobile_no, email } = req.body
  try {
    const newData = new User({
      username,
      password,
      confirm_password,
      mobile_no,
      email
    })
    await newData.save()
    return res.send(await User.find())
  } catch (err) {
    console.log(err.message)
  }
})
app.get('/', async (req, res) => {
  try {
    const allData = await User.find()
    return res.json(allData)
  } catch (err) {
    console.log(err.message)
  }
})
app.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.json(await User.find())
  } catch (err) {
    console.log(err.message)
  }
})
app.put('/put/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const updates = req.body
    const options = { new: true }
    const rest = await User.findByIdAndUpdate(id, updates, options)
    return res.json(await User.find())
  } catch (err) {
    console.log(err.message)
  }
})

app.options('/op', (req, res) => {
    try {
        const username = req.params.username
        res.status(200).json({"Request Method": 'OPTIONS', username})
    } catch (err) {
      console.log(err.message)
    }
  })
app.listen(3005, () => console.log('Server Running...'))
