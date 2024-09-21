import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gray-200 px-4 py-4 mt-7 text-gray-700 text-sm flex justify-center items-center">
        &copy; {new Date().getFullYear()} Certificate Design System. All rights reserved.
      </footer>
    </>
  )
}

export default Footer