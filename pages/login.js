import dynamic from 'next/dynamic'
import React from 'react'
//const Userlogin = dynamic(() => import('../src/User/Userlogin'), { ssr: false })
import Userlogin from '../src/User/Userlogin'
function login() {
  return (
    <div>
      <Userlogin/>
    </div>
  )
}

export default login