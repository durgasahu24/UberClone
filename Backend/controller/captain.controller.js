const blackListTokenModel = require('../models/blackListToken.model.js');
const captainModel = require('../models/captain.model.js');
const captainService = require('../services/captain.service.js');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    console.log("welcome in captain register :");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password, vehicle } = req.body;
    console.log("req.body", req.body);

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exist :" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    console.log("captina :");

    res.status(201).json({ token, captain });

}


module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("captain login: ", captain);

    const isMatched = await captain.comparePassword(password);

    console.log("isMatched: ", isMatched);

    if (!isMatched) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
};


module.exports.getCaptainProfile = async (req, res, next) => {
    console.log("welcome to getCaptain profile");
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req,res,next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]


    await blackListTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({message:'Logout successfully '})
}