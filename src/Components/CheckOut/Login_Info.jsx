import React from 'react'

const Login_Info = () => {
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
           </div>
         </form>    
     
    </>
  )
}

export default Login_Info
