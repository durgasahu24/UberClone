const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const Captain = require('../models/captain.model.js')


module.exports.authUser = async (req, res, next) => {

    console.log("welcome to auth middleware")
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('token', token);


    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        console.log("user in middlware : ", user)

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }



    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        console.log("token in captain middleware : ", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("deconded token : ", decoded);


        const captain = await Captain.findById(decoded._id);
        console.log("captain : ", captain);
        if (!captain) return res.status(404).send("Captain not found");
        req.captain = captain;


        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}