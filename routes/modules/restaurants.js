// restaurants 路由模組

// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 restaurant model
const Restaurant = require('../../models/restaurant')

// 定義路由

// 新增餐廳表單頁
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳（按下新增後）
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽特定餐廳頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// 更新特定餐廳資訊表單頁
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err => console.log(err)))
})

// 更新特定餐廳資訊（按下更新後）
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// 刪除頁面
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router