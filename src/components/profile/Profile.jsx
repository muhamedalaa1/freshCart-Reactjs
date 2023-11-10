import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner'



export default function Profile() {

  const [profile, setProfile] = useState(null)

  useEffect(function(){

  const profileDetails =  jwtDecode(localStorage.getItem('tkn'))

  setProfile(profileDetails)

  },[])

  if(profile===null){
    return <>
    
      <div className='vh-100 d-flex justify-content-center align-items-center'>

  <ThreeDots
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />

  </div>
    
    </>
  }
  

  return <>
  <Helmet>
      <title>Profile</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  
    <div className="container vh-100 d-flex justify-content-center align-items-center">
        <h2>Hello {profile.name}</h2>
    </div>
  
  </>
}
