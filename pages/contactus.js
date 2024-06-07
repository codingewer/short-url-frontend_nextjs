import dynamic from 'next/dynamic'
import React from 'react'
const ContactUs = dynamic(() => import('../src/Pages/ContactUs'), { ssr: false })


function aboutus() {
  return (
    <div>
        <ContactUs/>
    </div>
  )
}

export default aboutus