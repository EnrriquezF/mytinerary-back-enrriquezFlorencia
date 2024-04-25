const express = require("express");
const router = require("./router/router")
const connectDB = require("./config/db")
const cors = require('cors');
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'"]
    }
  }));

app.use("/api", router)

app.listen(3000, () =>{
    console.log("listening on port 3000");
}) //escucha al puerto

    