import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
    return (
<div className="min-h-screen w-full overflow-x-hidden bg-gray-200">
        <div className='w-full flex-grow'>
                <Header />
                    
                    <Outlet />
                      <ToastContainer position="top-right" autoClose={3000} />

                <Footer />
            </div>
              
        </div>

    )
}

export default MainLayout
