// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting body-parser, method-override, static files, routes, express-session
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUnintialized: true
}))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
