const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList.results)
    .then(() => {
      console.log('staurantSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})
