// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')

// 定義路由

// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router
