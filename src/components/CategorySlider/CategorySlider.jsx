import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';

export default function CategorySlider() {

    function getAllCategories(){


        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

   const {data , isLoading} = useQuery("categorySlider" , getAllCategories ,{

    refetchOnMount: false
   })




 const settings = {

  autoplay:true,
      speed: 5000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      dots: true,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 3,
      arrows : false
    };

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
  
    
  
  <div className='my-5'>
        
        <Slider {...settings}>

            {data?.data.data.map(function(category , index){return  <div className='mb-2' key={index}>
            <img style={{ width: "100%" , height: "200px" }} src={category.image} alt="" />
            <p>{category.name}</p>
          </div>})}

        </Slider>
      </div>
  
  
  
  
  
  
  
  </>
}
