const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../socket.js")
const rideModel = require("../models/ride.model.js")


module.exports.createRide = async (req, res) => {
    console.log("Welcome to create ride controller");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    console.log("Received data:", { pickup, destination, vehicleType });

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        if (!ride) {
            return res.status(500).json({ message: "Failed to create ride." });
        }

        console.log("Created ride:", ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log("Pickup coordinates:", pickupCoordinates);

        const captainsInRadius = await mapService.getCaptinsInTheRadious(
            pickupCoordinates.lat,
            pickupCoordinates.lon,
            2
        );

        console.log("Captains in radius:", captainsInRadius);

        if (!captainsInRadius.length) {
            console.log("No captains available.");
            return res.status(404).json({ message: "No captains available in the area." });
        }

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user");
        console.log("Ride with user details:", rideWithUser);

        captainsInRadius.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            });
        });

        res.status(201).json(ride);
    } catch (error) {
        console.error("Error in createRide:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);

    console.log("welecom to fare controller : ");
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    console.log("ride controller  pickup , destnation :", pickup, destination);

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports.confirmRide = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    console.log("ride id in confirm ride controller : ",rideId);

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        console.log("ride in controller : ",ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}



module.exports.startRide = async (req, res) => {

    console.log("welcome to start ride :");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    console.log("rideid : otp : ",rideId,otp);

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log("ride ",ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}




