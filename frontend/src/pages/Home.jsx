import React, { useState, useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext.jsx'
import { UserDataContext } from '../context/UserContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LiveTracking } from '../components/LiveTracking.jsx'
import { toast } from 'react-hot-toast'

function Home() {
  //video start from 4:26
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [watingForDriver, setWatingForDriver] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelOpenRef = useRef(null)
  const confirmRidePanelRef = useRef(false);
  const vehicleFoundRef = useRef(false);
  const waitingForDriverRef = useRef(false);

  const [activeField, setActiveField] = useState(null)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])

  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate();


  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext);

  console.log("user : ", user);


  useEffect(() => {

    console.log("User token:", localStorage.getItem('jwt'));
    if (user?._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
    //for updating socket id of user 


  }, [user])


  socket.on("ride-confirmed", ride => {

    console.log("ride confirm  :", ride);
    setVehicleFound(false);
    setWatingForDriver(true);
    setRide(ride);
  })

  socket.on('ride-started', ride => {
    console.log("ride stated run :");
    setWatingForDriver(false);
    navigate('/riding', { state: { ride } });
  })



  const handlePickupChange = async (e) => {
    console.log("e target value", e.target.value);
    setPickup(e.target.value)

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }

      })
      console.log("response data :", response.data);
      setPickupSuggestions(response.data)
    } catch (error) {
      // handle error
      console.log("error", error);

    }
  }


  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }



  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: '20px'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: '0px'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  const submitHandler = (e) => {
    e.preventDefault();
  };


  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelOpenRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelOpenRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])



  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])


  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])



  useGSAP(function () {
    if (watingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [watingForDriver])


  async function findTrip() {
    setVehiclePanelOpen(true)
    setPanelOpen(false)

    console.log("pickup", pickup);
    console.log("destination", destination);

    const jwt = localStorage.getItem('jwt');
    console.log("token in auth middleware : ", jwt);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })

    console.log("response data", response.data);
    setFare(response.data)
  }


  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })

    console.log("response : ", response);
    console.log("response data ", response.data);
    console.log("response status ", response.status);
    if (response.status === 404) {
      toast.error(response.data.message)
    }
  }



  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
      <div className='h-screen w-screen'>
        <LiveTracking />
      </div>

      <div className="absolute h-screen w-full top-0 flex flex-col justify-end">
        <div className='h-[30%] bg-white p-5 relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute right-6 top-6 opacity-0' > <i className="ri-arrow-down-wide-line"></i></h5>
          <h1 className='text-3xl font-semibold'>Find a trip</h1>
          <form onSubmit={submitHandler}>
            <div className='line w-1 absolute h-16 top-[48%] bg-gray-900 left-10'></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={(e) => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              className="bg-[#eee] rounded-lg w-full mt-5 px-12 py-2"
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}

              className="bg-[#eee] rounded-lg w-full mt-5 px-12 py-2"
              type="text"
              placeholder='Enter your destination'
            />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-11 w-full '>
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className='bg-white h-0'>

          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>


      <div
        ref={vehiclePanelOpenRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-3 py-6 translate-y-full pt-12 '>
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          fare={fare}
          createRide={createRide}
          setVehicleType={setVehicleType}
          selectVehicle={setVehicleType}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-6 py-12 translate-y-full pt-14 '>
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-6 py-12 translate-y-full pt-14 '>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          destination={destination}
          pickup={pickup}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-6 py-12 translate-y-full pt-14 '>
        <WaitingForDriver
          watingForDriver={watingForDriver}
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWatingForDriver={setWatingForDriver}
        />
      </div>

    </div>
  );
}

export default Home;