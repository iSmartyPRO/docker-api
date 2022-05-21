const express = require("express")
const morgan = require("morgan")

const app = express()

const apiRoutes = require("./routes/api")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('combined'))

app.use("/", apiRoutes)

module.exports = app