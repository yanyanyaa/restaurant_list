// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
// const restaurantList = require('./restaurant.json')

const mongoose = require("mongoose")
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

// routes setting
// 首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
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


// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword3
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//         || restaurant.category.toLowerCase().includes(keyword.toLocaleLowerCase())
//   }) 
//   res.render('index', { restaurants: restaurants, keyword: keyword})
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})