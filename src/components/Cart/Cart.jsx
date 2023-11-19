import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './cart.module.css'


export default function Cart() {

  const  {removeAllCart ,updateCount, removeItem , numOfCartItems,cartProducts,totalCartPrice} = useContext(cartContext);
  

  async function getupdate(id , count){

   const res =  await updateCount(id , count)


    if(res.status === "success"){
        toast.success("Updated successfully", {
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
         toast.error("error happened" , {
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
    
  }

  async function removeSpecificCartItem(productId){

    const res = await removeItem(productId);

    console.log(res);
    // toast
    if(res.status === "success"){
        toast.success("Deleted from cart", {
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
         toast.error("error happened" , {
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

    // toast


  }


  async function deleteAllCart(){

   const res = await removeAllCart();
    
      if(res.message === "success"){
        toast.success("Cart deleted", {
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
         toast.error("error happened" , {
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

  }

  if(cartProducts=== null){

     return <div className='container px-3 py-5'>

        <h2>Shop Cart </h2>

        <Link className='text-success' to={'/products'}>press to Add some products </Link>
      </div>

  }

  if(cartProducts.length === 0){

    return <>

      <div className='container px-3 py-5'>

        <h2>Shop Cart </h2>

        <Link className='text-success' to={'/products'}>press to Add some products </Link>
      </div>
    
    
    </>

  }

  return <>
  
  <Helmet>
      <title>Cart</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
  
  <div  className="container px-3 py-5 my-5">
    <h2>Shop Cart </h2>

    
    
    {cartProducts.map(function(product , index){
      
      console.log(product);
      return <div key={index} className="row my-3 py-3  border-bottom border-1 align-items-center">
     
        <div className="col-sm-1">
            <img src={product.product.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-sm-9">
            <p className='fs-4'>{product.product.title}</p>
            <p className='text-muted'> {product.product.category.name} </p>

        </div>
        <div  className="col-sm-2" >
          <p className='fw-medium'>{product.price} X {product.count} = {product.price * product.count} EGP</p>
          <div className="col-sm-2 d-flex  align-items-center">
              <button onClick={()=> getupdate(product.product.id , product.count + 1  ) } className={`${styles.countButton} btn btn-outline-success`}>+</button>
            <p className='mx-2 mb-0'>{product.count}</p>
            <button onClick={()=> getupdate(product.product.id , product.count - 1  ) } className={`${styles.countButton} btn btn-outline-danger me-2`}>-</button>

           <button onClick={()=> removeSpecificCartItem(product.product.id)} className={`${styles.countButton} btn btn-outline-danger`}><i class="fa-solid fa-trash"></i> </button>
          </div>
            

        </div>
    </div> })}

    <p  className='fw-bold'>Total Products: {numOfCartItems}</p>

    <div className='d-flex justify-content-between align-items-center'>
      <p className='fw-bold' > Total cart price </p>
    <p className='fw-bold'>{ totalCartPrice } EGP</p>
    </div>
    <div className='d-flex justify-content-between align-items-center'>
    <Link to={'/payment'} className=' text-white btn btn-primary'> Buy your cart </Link>

      <button onClick={()=> deleteAllCart()} className='btn btn-danger'> Clear all cart </button>
    </div>
  </div>



  </>
}
