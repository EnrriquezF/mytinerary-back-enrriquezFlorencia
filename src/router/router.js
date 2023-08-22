const express = require('express');
const router = express.Router();
const { getCity, getCities, addCity, modifyCity, deleteCity } = require('../controllers/cities.Controller');
const { verifyDataCity } = require('../middlewares/verifications');


router.get("/city/:id", getCity)
router.get("/cities", getCities)
router.post("/cities", verifyDataCity, addCity)
router.put("/city/:id", verifyDataCity, modifyCity)
router.delete("/cities", deleteCity)


module.exports= router;