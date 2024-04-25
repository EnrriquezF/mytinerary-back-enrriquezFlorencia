const City = require("../models/City")

const getCity = async (req, res) => {
 try{
    const {id} = req.params;

    let cityFound = await City.findById(id)

    res.status(200).json(cityFound)
 }catch(err){
    res.json({message: err.message})
 }
    
}

const getCities = async (req, res) => {
    let fields = Object.keys(req.query)
    let query = {}
    for (const field of fields) {
        query[field] ={ $regex : "^"+req.query[field], $options:'i'}
    }
    try{
        let cities = await City.find(query).populate('itineraries')
            
        res.json(cities)
    }
    catch(err) {
        res.json({message: err.message})
    }
}

const addCity = async (req, res) =>{
    try{
        let payload = req.body;

        let cityCreated = await City.create(payload);

        res.status(201).json({
            "message": "City has been added.",
            "city": cityCreated
        })
    } catch(err){
        res.status(500).json({message: err})
    }
    
}

const deleteCity = async (req, res) =>{
    try{
        let {id} = req.query;

        await City.deleteOne({_id: id});

        res.status(201).json({
            "message": "City has been deleted."
        })
    } catch(err){
        res.status(500).json({message: err})
    }
}

const modifyCity = async (req, res) =>{
    try{
        const {id} = req.params;
        

        let modifiedCity = await City.updateOne({_id:id}, {$set:req.body},
            {new: true});


        res.status(201).json({
            "message": "City has been updated.",
            "Modified city": modifiedCity
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = {
    getCity,
    getCities,
    addCity,
    modifyCity,
    deleteCity,
}