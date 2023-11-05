import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
 import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'

export default function ProductDetails() {

  const [productDetailsLoader, setProductDetailsLoader] = useState(false)

   const {addProductToCart} = useContext(cartContext)
    

    
    const {id} = useParams();
    
    

    async function addProduct(id){
      setProductDetailsLoader(true)
     const res =  await addProductToCart(id);
      if(res.status === "success"){
        toast.success(res.message , {
position: "top-right",
autoClose: 4000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }
      else{
         toast.error(res.message , {
position: "top-right",
autoClose: 3500,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }

      setProductDetailsLoader(false)
    }

    
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const {data , isLoading}= useQuery("productDetails" , getProductDetails);
    
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

    
  
    <div className="container py-5">
      <Helmet>
      <title>{data.data.data.title} </title>t
    </Helmet>
        <div  className="row  align-items-center  ">
            <div className="col-md-4">
                <figure>
                <img className='w-100'  src={data.data.data.imageCover} alt="data.data.data.title" />

                </figure>

            </div>
            <div className="col-md-8">


               <div className="details">
                 <h2>{data.data.data.title}</h2>
                 <p className='text-muted'>{data.data.data.description}</p>
                 <p>{data.data.data.category.name}</p>
                 <div className=' d-flex justify-content-between align-items-center'>
                    <h5>Price: {data.data.data.price}  EGP</h5>
                    <span>{data.data.data.ratingsAverage} <i className="fa-solid fa-star rateColor"></i></span>
                 </div>
          
               </div>

               <button onClick={()=> addProduct(data.data.data.id)}  className='mt-2 w-100 main-bg-color p-3 rounded-2 border-0 text-white'>
                
                {productDetailsLoader? <div className='d-flex justify-content-center align-items-center'>
                  <ThreeDots 
            height="20" 
            width="50" 
            radius="9"
            color="#fff" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
                </div>  :"+ ADD To Cart" }

                
                
                
                </button>
            </div>
        </div>
    </div>
  
  </>
}
