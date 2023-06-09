const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

// connect to DB
connectDB()
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/contacts', require('./routes/contactRoutes'))

app.use(errorHandler)
app.listen(PORT, () =>{
    console.log(`server started on ${PORT}`);
})