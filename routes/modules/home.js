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
    .catch(error => console.log('error'))
})

// 搜尋功能
router.get("/search", (req, res) => {
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


// 匯出路由模組
module.exports = router