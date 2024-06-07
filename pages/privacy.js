import dynamic from 'next/dynamic'
import React from 'react'
//const Privacy = dynamic(() => import('../src/Pages/Privacy'), { ssr: false })
import Privacy from '../src/Pages/Privacy'

function aboutus() {
  return (
    <div>
        <Privacy/>
    </div>
  )
}

export default aboutus