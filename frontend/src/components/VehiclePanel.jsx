import React from 'react'

function VehiclePanel(props) {
  return (
    <div>
      <h5
        onClick={() => { props.setVehiclePanelOpen(false) }}
        className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl mb-5 font-semibold'>Choose a Vehicle</h3>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('car');
      }} className="flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl mt-3">
        <img className='w-20 mb-2' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
        <div className='w-1/2 ml-4'>
          <h4 className='font-medium text-sm'>UberGo <span><i className="ri-map-pin-user-fill"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable , compact rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹{props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.selectVehicle('moto');
        }}
        className="flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl mt-3">
        <img className='w-20  mb-2' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className='w-1/2 ml-[-3px]'>
          <h4 className='font-medium text-sm'>Moto <span><i className="ri-map-pin-user-fill"></i>1</span></h4>
          <h5 className='font-medium text-sm'>3 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable motoride rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹{props.fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.selectVehicle('auto');
        }}

        className="flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl mt-3">
        <img className='w-20  mb-2' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className='w-1/2 ml-0'>
          <h4 className='font-medium text-sm'>UberAuto <span><i className="ri-map-pin-user-fill"></i>3</span></h4>
          <h5 className='font-medium text-sm'>3 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹{props.fare.auto}</h2>
      </div>
    </div>
  )
}

export default VehiclePanel
