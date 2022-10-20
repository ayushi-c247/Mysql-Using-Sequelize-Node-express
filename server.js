const cors = require('cors');
const express = require('express');
require('dotenv').config()

const router = require("./routes")

const app = express()

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));