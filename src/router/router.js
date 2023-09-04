const express = require('express');
const router = express.Router();
const { getCity, getCities, addCity, modifyCity, deleteCity, getCityByName } = require('../controllers/cities.Controller');
const { addItinerary, getItinerary, getItineraries, getItinerariesByCity, modifyItinerary, deleteItinerary } = require('../controllers/itinerariesController');
const { verifyDataCity, verifyDataItinerary } = require('../middlewares/verifications');


router.get("/city/:id", getCity)
router.get("/cities", getCities)
router.get("/cityByName", getCityByName)
router.post("/cities", verifyDataCity, addCity)
router.put("/city/:id", verifyDataCity, modifyCity)
router.delete("/cities", deleteCity)

router.get("/itinerary/:id", getItinerary) //Get ONE itinerary from the DB by its ID
router.get("/itineraries", getItineraries) //Get all the itineraries from the DB
router.get("/itinerary", getItinerariesByCity) //Get all the itineraries of ONE city from the DB
router.post("/itineraries/",verifyDataItinerary, addItinerary) //Add one itinerary to the DB
router.put("/itinerary/:id", modifyItinerary) //Modify one itinerary, found by its ID, from the DB
router.delete("/itineraries", deleteItinerary) //Delete ONE itinerary from the DB




module.exports= router;