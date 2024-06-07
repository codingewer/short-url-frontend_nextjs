import dynamic from 'next/dynamic'
import React from 'react'
const Terms = dynamic(() => import('../src/Pages/Terms'), { ssr: false })


function aboutus() {
  return (
    <div>
        <Terms/>
    </div>
  )
}

export default aboutus