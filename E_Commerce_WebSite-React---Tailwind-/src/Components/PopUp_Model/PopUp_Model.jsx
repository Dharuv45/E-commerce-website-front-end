import React from 'react'

const PopUp_Model = ({onClose}) => {
  return (
    <div className=' bg-black   fixed inset-0 flex bg-opacity-30  justify-center backdrop-blur-sm z-30'>
   
       <div className=' text-white flex mt-10  flex-col gap-5 mr-24'>
        <button className='place-self-end mt-20'
          onClick={()=> onClose()}
        >
            X
        </button>
        <div className='bg-indigo-600 py-10 px-10 rounded'>
            <h1 className="text-4xl">Congratulations</h1>
            <p>Your Order Placed SucessFully </p>
            <p>Please visit again </p>
        </div>
       </div>
    </div>
  )
}

export default PopUp_Model
