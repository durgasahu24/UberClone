const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware.js')
const mapController = require('../controller/maps.controller.js')
const { query } = require('express-validator');
// const { routes } = require('../app.js');


router.get('/get-coordinates', query('address').isString().isLength({ min: 3 }), authMiddleware.authUser, mapController.getCoordinates)

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
)


router.get('/get-suggestions',query('input').isString().isLength({min:3}),authMiddleware.authUser,mapController.getSuggestions)


module.exports = router;