// import React from 'react'

// function LocationSearchPanel(props) {
//     console.log(props);
//     // sample locatiion 
//     const location = [
//         "24B Near Kapoor's cafe , Sheryians Coding School , Bhopal ",
//         "24B Near Kapoor's cafe , Sheryians Coding School , Bhopal ",
//         "24B Near Kapoor's cafe , Sheryians Coding School , Bhopal ",
//         "24B Near Kapoor's cafe , Sheryians Coding School , Bhopal ",
//         "24B Near Kapoor's cafe , Sheryians Coding School , Bhopal ",
//     ]
//     return (
//         <div
           
//             className='mt-[-10px]'>
//             {location.map((item,idx) =>
//                 <div key={idx}
//                 onClick={() => {
//                     props.setVehiclePanelOpen(true);
//                     props.setPanelOpen(false)
//                 }}
//                 className="bg-yellow-200 border-2 p-3 border-gray-50 active:border-black rounded-xl   flex items-center justify-between gap-3 my-2">
//                     <h2 className='bg-[#eee] h-10 flex items-center justify-center w-16 rounded-full '><i className="ri-map-pin-fill"></i></h2>
//                     <h4 className='bg-orange-200 font-medium text-base'>{item}</h4>
//                 </div>
//             )
//             }
//         </div>
//     )
// }

// export default LocationSearchPanel


import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanelOpen, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        console.log("suggestion :",suggestion);
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel