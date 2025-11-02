import React from 'react'

const Delivery_Address = () => {
  return (
    <>
      <form className='bg-gray-200  mt-2 ml-5 s
                                      shadow-md rounded px-8 pt-6  pb-8 mb-4 w-full max-w-md'>
         <div className="mb-4">
             <div className=' flex  '>                         {/* Name and phone field  */}
                <div className='w-1/2'>
                <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="name">
                 Name
                 </label>
                 <input className="shadow appearance-none border rounded w-full  py-3 h px-3 text-gray leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"
                  placeholder="Name" />
                </div>

                <div className='w-1/2 ml-4'>
                <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="phone">
                 Phone
                </label>
                <input className="shadow appearance-none border rounded w-full py-3 h px-3 text-gray leading-tight 
                focus:outline-none focus:shadow-outline" 
                id="phone" type="text" placeholder="Phone" />
         
                </div>
             </div>
            
             <div className=' flex mt-3'>                 {/* Pincode & locality field  */}
                <div className='w-1/2'>
                <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="pincode">
                 Pin-Code
                 </label>
                 <input className="shadow appearance-none border rounded w-full  py-3 h px-3 text-gray leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"
                  placeholder="pincode" />
                </div>

                <div className='w-1/2 ml-4'>
                <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="locality">
                 Locality
                </label>
                <input className="shadow appearance-none border rounded w-full py-3 h px-3 text-gray leading-tight 
                focus:outline-none focus:shadow-outline" 
                id="locality" type="text" placeholder="locality" />
         
                </div>
             </div>

           
                <div className=' mt-3 w-full'>                  {/* Address field  */}
                <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="address">
                Address
                 </label>
                 <textarea
                   className="shadow appearance-none border rounded w-full py-3 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                   id="address"
                   placeholder="Address"
                   rows="5" 
                 />

                </div>
                
                <div className='flex mt-3'>
                                            
    <div className='w-1/2'>                 {/* City field */}
        <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="city">
            City
        </label>
        <input className="shadow appearance-none border rounded w-full py-3 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
               id="city"
               type="text"
               placeholder="City"
        />
    </div>

    
    <div className='w-1/2 ml-4'>                 {/* State select field */}
        <label className="block text-gray text-sm font-bold mb-2 h w" htmlFor="state">
            State
        </label>
        <div className="relative">
            <select className="shadow appearance-none border rounded w-full py-3 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    defaultValue=""
            >
                <option value="" disabled hidden>Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                {/* Add options for other Indian states */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M10 12l-6-6h12l-6 6z"/>
                </svg>
            </div>
        </div>
    </div>
</div>

               
         
         </div>

         

         
          <div className="flex items-center justify-between">
              <button className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:bg-blue-700 text-white font-bold py-2 px-4 
              rounded focus:outline-none focus:shadow-outline" type="submit" >
                 Done
              </button>
          </div>

                    </form> 
    </>
  )
}

export default Delivery_Address
