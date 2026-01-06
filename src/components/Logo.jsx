import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
     <div className="flex relative items-center gap-2 lg:py-4 flex-shrink-0 hover:scale-105 transition-transform duration-200">
              <Link
                href="/"
                className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-14 md:h-14 lg:w-24 lg:h-20"
              >
                <img
                  src="/assets/images/glassco_logo.png"
                  alt="Glassco Logo"
                  className="w-full h-full object-contain"
                />
              </Link>
              <p className='text-blue-300 -ml-16 -mb-12 lg:-ml-24 lg:-mb-16'>Be Glass superior</p>
            </div>
  )
}

export default Logo