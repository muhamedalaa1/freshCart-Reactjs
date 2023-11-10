import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categories() {



    function getAllCategory(){


    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

const {data , isLoading  } = useQuery("allCategory" , getAllCategory)


 if(isLoading){

    return  <div className='vh-100 d-flex justify-content-center align-items-center'>

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

  }


  return <>
  
  <Helmet>
      <title>Category</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>

  <div className="container my-5">
    <div className="row">
        
          {data?.data.data.map(function(cate , idx){return <div className='col-lg-3 col-md-4' key={idx}>

          <div>
            <h6>{cate.name}</h6>
            <img style={{height:"400px"}} className='w-100' src={cate.image} alt={cate.name} />  
          </div>

          </div>})}
        
     
    </div>
  </div>
  
  </>
}
