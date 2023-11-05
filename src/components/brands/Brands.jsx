import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {

      function getAllBrands(){


    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

const {data , isLoading  } = useQuery("allBrands" , getAllBrands)


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

  console.log(data.data.data);

   return <>
  
  <Helmet>
      <title>Category</title>t
    </Helmet>

  <div className="container my-5">
    <div className="row g-4">
        
          {data?.data.data.map(function(cate , idx){return <div className='col-lg-3 col-md-4' key={idx}>

          <div className='shadow'>
            
            <img  className='w-100' src={cate.image} alt={cate.name} />  
          </div>

          </div>})}
        
     
    </div>
  </div>
  
  </>
}
