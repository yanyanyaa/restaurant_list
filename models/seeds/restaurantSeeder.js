const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const userList = require('../../user.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(
    userList.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
            .catch(err => console.log(err))
        })
        .then(user => {
          const userId = user._id
          const restaurantOwned = seedUser.restaurantOwned.map(item => {
            return Object.assign(restaurantList[item - 1], { userId })
          })
          return restaurantOwned
        })
        .then(restaurantOwned => {
          return Restaurant.create(restaurantOwned)
            .catch(err => console.log(err))
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
