import React from 'react'
import notFound from '../../images/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return <>

  <Helmet>
      <title>Not found</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  <div  className='d-flex justify-content-center align-items-center my-4 '>
  <img src={notFound} className='w-50 my-5' alt="not found page" />

  </div>
  
  </>
}
