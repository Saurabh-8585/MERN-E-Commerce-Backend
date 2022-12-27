const connectToMongo = require('./config');
const express = require('express')
const app = express()
const cors = require('cors')
const auth = require('./routes/auth');
const cart = require('./routes/cart')
const product=require('./routes/product')
connectToMongo();
const port = 5000

app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth', auth)
app.use('/api/cart', cart)
app.use('/api/product', product)


app.listen(port, () => {
    console.log(`E-commerce backend listening at http://localhost:${port}`)
})