// home(首頁) 路由模組

// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// 排序功能
router.get('/sort/:sortBy', (req, res) => {
  const sortBy = req.params.sortBy
  Restaurant.find()
    .lean()
    .sort({ [sortBy]: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// 搜尋功能
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(
        data =>
          data.name.trim().toLowerCase().includes(keyword) ||
          data.category.trim().toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants, keyword })
    })
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router
