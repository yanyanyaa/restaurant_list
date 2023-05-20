// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const mongoose = require("mongoose")
const restaurant = require('./models/restaurant')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting method-override
app.use(methodOverride('_method'))

// routes setting
// 首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log('error'))
})

// 新增餐廳頁
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳頁（按下新增後）
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽特定餐廳頁面
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// 更新特定餐廳資訊頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err => console.log(err)))
})

// 更新特定餐廳資訊頁面（按下更新後）
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
  })

// 刪除頁面
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 搜尋頁面
app.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }

  const keyword = req.query.keyword.trim().toLowerCase()
 
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(
        data =>
          data.name.trim().toLowerCase().includes(keyword.trim().toLowerCase()) ||
          data.category.trim().toLowerCase().includes(keyword.trim().toLowerCase())
      )
      res.render('index', { restaurants, keyword })
    })
    .catch(err => console.log(err))
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})