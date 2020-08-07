require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port =  process.env.PORT || 3000;
const routes = require('./routes')
const errorHandler = require('./midlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

console.log(port);

app.listen(port, () => {
    console.log(`server running on port: ${port}...`);
})
