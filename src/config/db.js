const { connect } = require('mongoose');

const URI= "mongodb+srv://admin:admin@cluster0.7rsg1gb.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () =>{
  connect(URI)
    .then(()=> console.log("Connection to DataBase success"))
    .catch(()=> console.log("Error connecting"))
}

connectDB()

module.exports = connectDB
