const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')
const teacherRouter = require('./Teacher/router')
const batchRouter = require('./Batch/router')
const studentRouter = require('./Student/router')


const app = express()
const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
//variables
const port = process.env.PORT || 4000
db.sync({force:false})
.then(() => console.log("Database connected"))
.catch(console.error)

app.use(teacherRouter)
app.use(batchRouter)
app.use(studentRouter)


app.listen(port, () => console.log(`listen to my port ${port}`))