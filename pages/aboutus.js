import dynamic from 'next/dynamic'
import React from 'react'
const AboutUs = dynamic(() => import('../src/Pages/AboutUs'), { ssr: false })


function aboutus() {
  return (
    <div>
        <AboutUs/>
    </div>
  )
}

export default aboutus