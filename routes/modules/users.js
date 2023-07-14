const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user.js')

// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

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

// 登出
router.get('/logout', (req,res) => {
  req.logout()
  res.redirect('/users/login')
})

// 匯出路由器
module.exports = router
