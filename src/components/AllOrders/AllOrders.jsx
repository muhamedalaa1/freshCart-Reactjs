import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import './order.module.css'
import { Helmet } from 'react-helmet';
export default function AllOrders() {


   

    const [userAllOrders, setUserAllOrders] = useState(null)

    useEffect(function(){

    const user = jwtDecode(localStorage.getItem('tkn'))


        getUserOrders(user.id)

    },[])


     async function getUserOrders(id){

        try {
            
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        
        console.log(data);

        setUserAllOrders(data)

        } catch (error) {
            console.log("error" , error);
        }


    }

    if(userAllOrders === null){

     return <div className='vh-100 d-flex justify-content-center align-items-center'>

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
      <title>All orders</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  
  <div className="container my-5 py-5 overflow-x-auto">

    

  <table>
    <thead>
      <tr>
        <th style={{width:"15%"}}>Product image</th>
        <th>Title</th>
        <th>Price</th>
        <th>Count</th>
        <th>Total price</th>
        <th>Phone</th>
        <th>City</th>
        <th>User email</th>
        <th>Payment method</th>

      </tr>
    </thead>
    {userAllOrders.map(function(order , index){
        console.log(order);

        
        return <tbody key={index}>

            {order.cartItems.map(function(item , idx){
              console.log(item);
                return <tr key={idx}>
        <td><img className='w-50' src={item.product.imageCover} alt="" /></td>
        <td className='fw-bold'>{item.product.title.split(" ").slice(0,3).join(" ")}</td>
        <td className='fw-bold'>{item.price} EGP</td>
        <td className='fw-bold'>{item.count}</td>
        <td className='fw-bold'>{item.price * item.count} EGP</td>
        <td className='fw-bold'>{order.shippingAddress.phone} </td>
        <td className='fw-bold'>{order.shippingAddress.city} </td>
        <td className='fw-bold'>{order.user.email} </td>
        <td className='fw-bold text-primary'>{order.paymentMethodType} </td>

      </tr>
            })}
      
    </tbody>
        })}
    
  </table>






{/* <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Product image</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Count</th>
      <th scope="col">Total price</th>
      <th scope="col">Phone</th>
      <th scope="col">City</th>
      <th scope="col">User email</th>
      <th scope="col">Payment method</th>
    </tr>
  </thead>

        {userAllOrders.map(function(order , index){
        console.log(order);

        
        return <tbody key={index}>

            {order.cartItems.map(function(item , idx){
              console.log(item);
                return <tr key={idx}>
        
        <td><img className='w-50' src={item.product.imageCover} alt="" /></td>
        <td className='fw-bold'>{item.product.title.split(" ").slice(0,3).join(" ")}</td>
        <td className='fw-bold'>{item.price} EGP</td>
        <td className='fw-bold'>{item.count}</td>
        <td className='fw-bold'>{item.price * item.count} EGP</td>
        <td className='fw-bold'>{order.shippingAddress.phone} </td>
        <td className='fw-bold'>{order.shippingAddress.city} </td>
        <td className='fw-bold'>{order.user.email} </td>
        <td className='fw-bold text-primary'>{order.paymentMethodType} </td>

      </tr>
            })}
      
    </tbody>
        })}
    
  </table> */}







  </div>
  




  {/* ==================================== */}


  

  





</>

  
  
  
  
}
