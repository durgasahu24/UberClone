const axios = require('axios');
const captainModel = require('../models/captain.model.js');



module.exports.getAddressCoordinate = async (address) => {

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "UberClone/1.0 (nominatim@yourdomain.com)", // REQUIRED
                "Accept-Language": "en",
            }
        });
        console.log("response in getAddress  ", response.data);

        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: location.lat,
                lon: location.lon
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};






// Function to calculate the distance and time between two addresses using OpenRouteService API
module.exports.getDistanceTime = async (originAddress, destinationAddress) => {

    if (!originAddress || !destinationAddress) {
        throw new Error('Both origin and destination addresses are required');
    }

    console.log("orginAddress :", originAddress);
    console.log("destinationAddress:", destinationAddress)


    const origin = await module.exports.getAddressCoordinate(originAddress);
    const destination = await module.exports.getAddressCoordinate(destinationAddress);


    const apiKey = process.env.ORS_API_KEY;  // Replace with your OpenRouteService API key

    console.log("api key:", apiKey);

    const url = `https://api.openrouteservice.org/v2/matrix/driving-car?api_key=${apiKey}`;

    try {
        const response = await axios.post(url, {
            locations: [
                [origin.lon, origin.lat],  // Origin: [longitude, latitude]
                [destination.lon, destination.lat]  // Destination: [longitude, latitude]
            ],
            metrics: ['duration', 'distance'],  // Fetch duration and distance
        });

        console.log("Response data:", response.data);  // Log to inspect response structure

        if (response.data && response.data.durations && response.data.distances) {
            const distance = response.data.distances[0][1];  // Distance between origin and destination
            const duration = response.data.durations[0][1];  // Duration between origin and destination
            console.log("distance ;", distance);
            console.log("duration :", duration);
            return { distance, duration };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error in distance time:', error);
        throw error;
    }
};



// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     // Add the `accept-language=en` to get results in English
//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5&accept-language=en`;

//     try {
//         const response = await axios.get(url);
//         if (response.data && response.data.length > 0) {
//             return response.data.map(prediction => prediction.display_name);
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };



module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("query is required");
    }

    // Nominatim API URL
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        input
    )}&format=json&addressdetails=1&limit=5&accept-language=en`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "UberClone/1.0 (nominatim@yourdomain.com)" // required by Nominatim
            },
        });

        if (response.data && response.data.length > 0) {
            return response.data.map((prediction) => prediction.display_name);
        } else {
            return []; // return empty array if no results
        }
    } catch (err) {
        console.error("Error fetching suggestions:", err.message);
        throw new Error("Failed to fetch location suggestions");
    }
};






module.exports.getCaptinsInTheRadious = async (ltd, lng, radius) => {

    // radius in km

    console.log("lted : lng : radious : ", ltd, lng, radius);


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;
    // Because 6371 is the Earth's radius in kilometers.

}
