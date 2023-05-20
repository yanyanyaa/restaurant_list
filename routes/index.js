// 專案總路由器

// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 home, restaurants 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// 將網址結構符合該字串的 request 導向該模組 
router.use('/', home) 
router.use('/restaurants', restaurants)


// 匯出路由器
module.exports = router