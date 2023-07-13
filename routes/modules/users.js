// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 定義路由
router.get('/login', (req,res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

// 匯出路由器
module.exports = router
