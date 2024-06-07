import dynamic from 'next/dynamic'
import React from 'react'
const PaidPage = dynamic(() => import('../src/Pages/PaidPage'), { ssr: false })


function aboutus() {
  return (
    <div>
        <PaidPage/>
    </div>
  )
}

export default aboutus