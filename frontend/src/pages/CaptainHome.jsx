import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { SocketContext } from "../context/SocketContext.jsx"
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import axios from 'axios'
import { LiveTracking } from '../components/LiveTracking.jsx'

function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);


  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext)


  useEffect(() => {
    console.log("Captain token:", localStorage.getItem('token'));
    if (captain?._id) {
      socket.emit("join", { userId: captain._id, userType: 'captain' });
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captain]);






  console.log('Token before:', localStorage.getItem('token'));

  socket.on('new-ride', (data) => {
    if (!data || typeof data !== 'object') {
      console.error('Invalid ride data received:', data);
      return;
    }
    setRide(data);
    setRidePopupPanel(true);
    console.log('New ride data received:', data);
  });

  console.log('Token after:', localStorage.getItem('token'));



  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }


  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])



  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])



  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen' >
        <div><img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /></div>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i class="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className=' w-full'>
        <LiveTracking height='60vh' />

      </div>
      <div className='h-2/5 p-4'>
        <CaptainDetail />
      </div>
      <div
        ref={ridePopupPanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
