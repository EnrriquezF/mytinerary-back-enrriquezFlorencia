const { connect } = require('mongoose');
const env = require('dotenv').config();

const URI= process.env.DATABASE_URL

const connectDB = async () =>{
  connect(URI)
    .then(()=> console.log("Connection to DataBase success"))
    .catch(()=> console.log("Error connecting"))
}

connectDB()

module.exports = connectDB
