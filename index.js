const connectToMongo = require('./config');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const auth = require('./routes/auth');
const cart = require('./routes/cart')
const wishlist = require('./routes/wishlist')
const product = require('./routes/product')
const review = require('./routes/review')
connectToMongo();
const port = 5000


// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth', auth)
app.use('/api/product', product)
app.use('/api/cart', cart)
app.use('/api/wishlist', wishlist)
app.use('/api/review', review)


app.listen(port, () => {
    console.log(`E-commerce backend listening at http://localhost:${port}`)
})
