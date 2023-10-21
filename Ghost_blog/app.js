const express = require('express')
const cors = require('cors'); 
const blogRouter = require('./routers/blog')
const app = express()
require('dotenv').config();
app.use(cors());
app.use(express.json())

app.use(blogRouter)

module.exports = app