import dynamic from 'next/dynamic'
import React from 'react'
//const PaidPage = dynamic(() => import('../src/Pages/PaidPage'), { ssr: false })
import PaidPage from '../src/Pages/PaidPage'

function aboutus() {
  return (
    <div>
        <PaidPage/>
    </div>
  )
}

export default aboutus