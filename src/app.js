const express = require("express");
const router = require("./router/router")
const connectDB = require("./config/db")
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api", router)

app.listen(3000, () =>{
    console.log("listening on port 3000");
}) //escucha al puerto

    