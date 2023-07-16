// 專案總路由器

// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 home, restaurants, users, auth 模組程式碼, middleware
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth.js')

// 將網址結構符合該字串的 request 導向該模組
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router
