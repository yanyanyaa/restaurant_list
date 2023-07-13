// 專案總路由器

// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 home, restaurants, users 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// 將網址結構符合該字串的 request 導向該模組
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/', home)

// 匯出路由器
module.exports = router
