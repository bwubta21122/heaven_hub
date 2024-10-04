import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer class="bg-white py-6 mt-10">
        <div class="container mx-auto px-4 mb-20 text-center">
        <div class="flex justify-center space-x-4 mb-10">
            <a href="https://www.instagram.com/" class="text-gray-600 hover:text-gray-900">Instagram</a>
            <a href="https://www.linkedin.com/" class="text-gray-600 hover:text-gray-900">LinkedIn</a>
          </div>
          <p class="text-lg mb-10">832 N Wellness Drive, Midway, UT 84049</p>
          <p class="text-lg mb-20">888 680-1814 | sales@ameyalli.com</p>
          
          <p className='text-sm mb-2'>Copyright © 2024 AMEYALLI </p>
          <p className="text-sm mb-10">&copy; 2024 AMEYALLI. Christie's International Real Estate. All Rights Reserved.</p>
          <p className="text-sm mb-3">PRIVACY POLICY | LEGAL</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
