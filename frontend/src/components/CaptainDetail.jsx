import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'


function CaptainDetail() {
  const { captain } = useContext(CaptainDataContext);
  console.log("captain", captain);

  return (
    <div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-20 w-20 rounded-full object-cover' src="https://images.ctfassets.net/vztl6s0hp3ro/730j3EU8CMGQShwD1iLV7F/6e1c84839ab12aa03958a33fea129ded/what-is-a-chief-people-officer-and-why-does-it-matter.webp" alt="" />
          <h4 className='text-lg font-medium'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>249.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex justify-center gap-4 items-start p-3 bg-gray-50 rounded-xl'>
        <div className='text-center'>
          <i className="text-3xl font-thin mb-2   ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>10.5</h5>
          <p className='text-sm text-gray-600'>Hours Online</p></div>
        <div className='text-center'  ><i className=" text-3xl mb-2 font-thin  ri-speed-up-fill"></i><h5 className='text-lg font-medium'>10.5</h5>
          <p className='text-sm text-gray-600'>Hours Online</p></div>
        <div className='text-center'><i className=" text-3xl mb-2 font-thin  ri-booklet-line"></i><h5 className='text-lg font-medium'>10.5</h5>
          <p className='text-sm text-gray-600'>Hours Online</p></div>
      </div>
    </div>
  )
}

export default CaptainDetail
