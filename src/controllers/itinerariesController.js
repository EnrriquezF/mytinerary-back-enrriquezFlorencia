const City = require('../models/City');
const Itinerary = require('../models/Itinerary')

const getItinerary = async (req, res) => {
    try{
        let {id} = req.params;
        let itineraryFound = await Itinerary.findById(id).populate('city')

        res.status(200).json(itineraryFound)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const getItineraries = async (req, res) =>{
    let fields = Object.keys(req.query)
    let query = {}
    for (const field of fields) {
        query[field] ={ $regex : "^"+req.query[field], $options:'i'}
    }
    try{
        let itineraries = await Itinerary.find(query).populate({path:'city', select: '-itineraries'})
            
        res.json(itineraries)
    }
    catch(err) {
        res.json({message: err.message})
    }
}

const getItinerariesByCity = async (req, res) => {
    try{
        let {id} = req.query;
        let cityFound = await City.findById(id).populate({path: 'itineraries', select: '-city'})
        
        res.status(200).json(cityFound.itineraries)
    }
    catch(err) {
        res.json({message: err.message})
    }
}

const addItinerary = async (req, res) =>{
    try{
        let {id} = req.query;
        let payload = req.body;

        let cityFound = await City.findById(id)

        let itineraryCreated = await Itinerary.create({
            name: payload.name,
            price: payload.price,
            duration: payload.duration,
            likes: payload.likes,
            city: cityFound
        })

        await cityFound.updateOne({itineraries:[...cityFound.itineraries, itineraryCreated]})
        
        let cityFoundUpdated = await City.findById(id).populate("itineraries")
        res.status(201).json({
            message: (cityFound.name+" has been succesfully updated"),
            "itinerary": cityFoundUpdated
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const modifyItinerary = async(req, res) =>{
    try{
        const {id} = req.params;
        

        let modifiedItinerary = await Itinerary.updateOne({_id:id}, {$set:req.body},
            {new: true});


        res.status(201).json({
            "message": "Itinerary has been updated.",
            "Modified itinerary": modifiedItinerary
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const deleteItinerary = async (req, res) =>{
    try{
        let {id} = req.query;

        await Itinerary.deleteOne({_id: id})

        
        res.status(201).json({
            "message": "Itinerary has been deleted."
        })
    } catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = {
    addItinerary,
    getItinerary,
    getItineraries,
    getItinerariesByCity,
    modifyItinerary,
    deleteItinerary
}