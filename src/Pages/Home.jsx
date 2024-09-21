import React, { useState } from 'react'
import certificateImage from "../assets/certificate.png"
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <section className="flex items-center  p-8 h-max-[100vh]">
                <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold mb-4">Certificate Management <span className='text-primary-color'>System</span></h1>
                    <p className="text-lg mb-8">Easily manage and track your certificates in one place.</p>
                    <Link to="/certificate" className='border-2 border-primary-color px-[60px] py-4 rounded-lg text-[22px] font-semibold hover:bg-primary-color transition-all'>Get your Certificate</Link>
                </div>

                <div className=''>
                    <img src={certificateImage} alt="certificateImage" className='w-[70%] mx-auto' />
                </div>
            </section>
        </>
    )
}

export default Home




