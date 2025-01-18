# UberClone

UberClone is a ride-booking application built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to book rides through OTP authentication, calculates dynamic fares and estimated times based on location, and receives real-time updates using **Socket.IO**. The app uses **React Context API** for state management, providing a simple and scalable way to manage global state across components.

## Features

- **OTP-based Ride Booking**: Users can book a ride by verifying their identity through OTP (One-Time Password) sent to their mobile.
- **Fare and Time Calculation**: The app calculates dynamic fare and estimated time of arrival (ETA) using APIs based on the user's current location (latitude and longitude).
- **Real-Time Updates**: Ride status and progress are updated in real-time using **Socket.IO**.
- **Location Data**: Latitude and longitude are used for calculating fares, ETA, and providing location-specific information.
- **User Authentication**: Users must authenticate using OTP before booking a ride.
- **Context API for State Management**: The app uses React's **Context API** for global state management, making it easier to manage and update app-wide state like user data, ride details, etc.
- **MongoDB Integration**: User data, ride details, and other important information are stored in **MongoDB**.

## Tech Stack

- **Frontend**: React.js with Context API for state management
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **OTP Verification**: Integrated OTP system for user authentication
- **APIs for Fare and Time Calculation**: Third-party APIs for calculating fare and ETA based on the user's location
- **Map Integration**: Static map images for location representation
- **State Management**: React Context API for global state management

## Getting Started

Follow the instructions below to set up both the frontend and backend locally:

### 1. Clone the repository
Clone the project from GitHub:
```bash
git clone https://github.com/durgasahu24/UberClone.git
cd UberClone
```




