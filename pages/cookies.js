import dynamic from 'next/dynamic'
import React from 'react'
//const Cookies = dynamic(() => import('../src/Pages/Cookies'), { ssr: false })
import Cookies from '../src/Pages/Cookies'

function cookies() {
  return (
    <div>
        <Cookies/>
    </div>
  )
}

export default cookies