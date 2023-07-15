// restaurants 路由模組

// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 restaurant model
const Restaurant = require('../../models/restaurant')
const restaurant = require('../../models/restaurant')

// 定義路由

// 新增餐廳表單頁
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳（按下新增後）
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽特定餐廳頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// 更新特定餐廳資訊表單頁
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// 更新特定餐廳資訊（按下更新後）
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category 
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save() 
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router