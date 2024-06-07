import dynamic from 'next/dynamic'
import React from 'react'
//const Faq = dynamic(() => import('../src/Pages/Faq'), { ssr: false })
import Faq from '../src/Pages/Faq'

function aboutus() {
  return (
    <div>
        <Faq/>
    </div>
  )
}

export default aboutus