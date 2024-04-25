const express = require('express');
const router = express.Router();
const { getCity, getCities, addCity, modifyCity, deleteCity, } = require('../controllers/cities.Controller');
const { addItinerary, getItinerary, getItineraries, getItinerariesByCity, modifyItinerary, deleteItinerary } = require('../controllers/itinerariesController');
const { verifyDataCity, verifyDataItinerary } = require('../middlewares/verifications');
const authRouter = require('./auth');
const { passportVerificator, generateToken } = require('../middlewares/auth');


router.get("/city/:id", getCity)
router.get("/cities", getCities)
router.post("/cities", passportVerificator.authenticate( "jwt", {session: false} ), verifyDataCity, addCity)
router.put("/city/:id", passportVerificator.authenticate( "jwt", {session: false} ), verifyDataCity, modifyCity)
router.delete("/cities", passportVerificator.authenticate( "jwt", {session: false} ), deleteCity)

router.get("/itinerary/:id", getItinerary) //Get ONE itinerary from the DB by its ID
router.get("/itineraries", getItineraries) //Get all the itineraries from the DB
router.get("/itinerary", getItinerariesByCity) //Get all the itineraries of ONE city from the DB
router.post("/itineraries/", passportVerificator.authenticate( "jwt", {session: false} ), verifyDataItinerary, addItinerary) //Add one itinerary to the DB
router.put("/itinerary/:id", passportVerificator.authenticate( "jwt", {session: false} ), modifyItinerary) //Modify one itinerary, found by its ID, from the DB
router.delete("/itineraries", passportVerificator.authenticate( "jwt", {session: false} ), deleteItinerary) //Delete ONE itinerary from the DB

router.use("/user", authRouter) //all the paths to user actions, such as signing up, signing in, signing out, and authentication


module.exports= router;