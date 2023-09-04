const verifyDataCity = (req, res, next) =>{
    let {name, country, description, image, alt } = req.body;

    if(!name || !country || !description || !image || !alt ) {
        return res.status(400).json({message: "invalid data"})
    }
    if( name == "" || country == "" || description == "" ||image == ""|| alt== ""){
        return res.status(400).json({message: "invalid data"})
    }
    next()
};

const verifyDataItinerary = (req, res, next) =>{
    let {name, price, duration } = req.body;

    if(!name || !price || !duration ) {
        return res.status(400).json({message: "invalid data"})
    }
    if( name == "" ){
        return res.status(400).json({message: "invalid data"})
    }
    next()
};

module.exports = {
    verifyDataCity,
    verifyDataItinerary
}