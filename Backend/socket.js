const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    console.log("hello from socket.js");
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`Join event received: userId=${userId}, userType=${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                console.log("welcome captain type")
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log(`Update location event received: userId=${userId}, location=${JSON.stringify(location)}`);

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

// const sendMessageToSocketId = (socketId, messageObject) => {
//     console.log("sendMessage to socket id here : ",messageObject)
//     console.log("event type :",messageObject.event);

//     if (io) {
//         io.to(socketId).emit(messageObject.event, messageObject.data);
//     } else {
//         console.log('Socket.io not initialized.');
//     }
// }

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log('Preparing to send message:', { event: messageObject?.event, socketId });

    if (!io) {
        console.error('Socket.io instance is not initialized.');
        return;
    }

    if (!messageObject || typeof messageObject !== 'object' || !messageObject.event || !messageObject.data) {
        console.error('Invalid or malformed messageObject:', messageObject);
        return;
    }

    if (!socketId) {
        console.error('Invalid socket ID:', socketId);
        return;
    }

    try {
        if (io.sockets.sockets.has(socketId)) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
            console.log(`Message successfully sent to socket ID ${socketId}`);
        } else {
            console.warn(`Socket ID ${socketId} is not connected.`);
        }
    } catch (error) {
        console.error(`Failed to send message to socket ID ${socketId}:`, error);
    }
};


// const sendMessageToSocketId = (socketId, messageObject) => {
//     console.log("sendMessage to socket id here:", messageObject);
//     console.log("event type:", messageObject?.event);

//     if (!io) {
//         console.log('Socket.io not initialized.');
//         return;
//     }

//     if (!messageObject || !messageObject.event || !messageObject.data) {
//         console.log('Invalid messageObject:', messageObject);
//         return;
//     }

//     try {
//         if (io.sockets.sockets.has(socketId)) {
//             io.to(socketId).emit(messageObject.event, messageObject.data);
//             console.log(`Message sent to socket ID ${socketId}`);
//         } else {
//             console.log(`Socket ID ${socketId} is not connected.`);
//         }
//     } catch (error) {
//         console.error(`Failed to send message to socket ID ${socketId}:`, error);
//     }
// };


module.exports = { initializeSocket, sendMessageToSocketId };