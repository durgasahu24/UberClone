import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

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



  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
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
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] rounded-lg w-full mt-5 px-12 py-2"
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] rounded-lg w-full mt-5 px-12 py-2"
              type="text"
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>


      <div
        ref={vehiclePanelOpenRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-3 py-6 translate-y-full pt-12 '>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      <div
        ref={confirmRidePanelRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-6 py-12 translate-y-full pt-14 '>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={vehicleFoundRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-6 py-12 translate-y-full pt-14 '>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={waitingForDriverRef}
        className='fixed z-10 bottom-0 bg-white  w-full  px-6 py-12 translate-y-full pt-14 '>
        <WaitingForDriver watingForDriver={watingForDriver} />
      </div>

    </div>
  );
}

export default Home;