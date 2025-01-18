const axios = require('axios');
const captainModel = require('../models/captain.model.js');



// module.exports.getAddressCoordinate = async (address) => {
//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;

//     try {
//         const response = await axios.get(url);
//         console.log("response ", response.data);

//         if (response.data && response.data.length > 0) {
//             const location = response.data[0];
//             return {
//                 ltd: location.lat,
//                 lng: location.lon
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };


// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.ORS_API_KEY;  // Use your OpenRouteService API key here

//     console.log('api key:', apiKey);

//     const url = `https://api.openrouteservice.org/v2/matrix/driving-car?api_key=${apiKey}`;
    
//     try {
//         const response = await axios.post(url, {
//             locations: [
//                 [origin.lng, origin.lat],  // Origin: [longitude, latitude]
//                 [destination.lng, destination.lat]  // Destination: [longitude, latitude]
//             ],
//             metrics: ['duration', 'distance'],  // Fetch duration and distance
//         });

//         console.log("Response data:", response.data);  // Log to inspect response structure

//         if (response.data && response.data.durations && response.data.distances) {
//             const distance = response.data.distances[0][1];  // Distance between origin and destination
//             const duration = response.data.durations[0][1];  // Duration between origin and destination
//             return { distance, duration };
//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// };


// const axios = require('axios');

// Function to get the coordinates (latitude and longitude) from an address using OpenStreetMap's Nominatim API
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`;

    try {
        const response = await axios.get(url);
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

    console.log("orginAddress :",originAddress);
    console.log("destinationAddress:",destinationAddress)

    // Get coordinates for both origin and destination
    const origin = await module.exports.getAddressCoordinate(originAddress);
    const destination = await module.exports.getAddressCoordinate(destinationAddress);

    // Now call OpenRouteService to calculate the distance and time
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
            console.log("distance ;",distance);
            console.log("duration :",duration);
            return { distance, duration };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    // Add the `accept-language=en` to get results in English
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5&accept-language=en`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            // Return the suggestions in English
            return response.data.map(prediction => prediction.display_name);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};






// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5`;

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


module.exports.getCaptinsInTheRadious = async (ltd, lng, radius) => {

    // radius in km

    console.log("lted : lng : radious : ",ltd,lng , radius);


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}








// module.exports.getAddressCoordinate = async (address) => {
//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         console.log("response ", response.data);
//         if (response.data.status === 'OK') {
//             const location = response.data.results[0].geometry.location;
//             return {
//                 ltd: location.lat,
//                 lng: location.lng
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }


// module.exports.getDistanceTime = async (origin, destination) => {

//     console.log("welecom to service getDistance time")

//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API_KEY;

//     console.log("api key :", apiKey);

//     const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${apiKey}`;


//     try {

//         const response = await axios.get(url);
//         // console.log("response :", response);
//         if (response.data.status === 'OK') {

//             if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
//                 throw new Error('No routes found');
//             }

//             return response.data.rows[0].elements[0];

//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }


//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }


// module.exports.getAutoCompleteSuggestions = async (input) => {

//     console.log("suggestion in map")

//     if (!input) {
//         throw new Error('query is required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API_KEY;

//     console.log("api key :", apiKey);

//     const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             return response.data.predictions.map(prediction => prediction.description).filter(value => value);
//             // return response.data
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }


// module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

//     // radius in km


//     const captains = await captainModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [[ltd, lng], radius / 6371]
//             }
//         }
//     });

//     return captains;


// }