import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

export default function Payment() {

   const {cartId,setTotalCartPrice,setCartProducts,setNumOfCartItems} = useContext(cartContext)

   async function confirmCashPayment(){

    let city = document.getElementById('city')
    let phone = document.getElementById('phone')
    let details = document.getElementById('details')

    

    try {



    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    "shippingAddress":{
        "details":details.value ,
        "phone": phone.value,
        "city": city.value
        }
} ,{
    headers:{token:localStorage.getItem('tkn')}
})

    console.log(data);

    if(data.status === "success"){


        setTotalCartPrice(0);
        setCartProducts([]);
        setNumOfCartItems(0);

        toast.success("Order successfully added", {
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

    } catch (error) {
        console.log("error" , error);
    }
  




    }


    async function confirmOnlinePayment(){

        let city = document.getElementById('city')
        let phone = document.getElementById('phone')
        let details = document.getElementById('details')

        try {
            
            
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        "shippingAddress":{
            "details":details.value ,
            "phone":phone.value ,
            "city": city.value
        }
},{
    headers:{token:localStorage.getItem('tkn')}
})

    window.open(data.session.url , "_blank")

        } 
        catch (error) {
            console.log("error" , error);
        }

    }




  return <>

    <Helmet>
      <title>Payment</title>
   <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>

    <div className="container vh-100 d-flex justify-content-center align-items-center ">

        <form className='w-100'>

            {/* selection */}

        
        <input className='form-control mb-3' placeholder='city' type="text" id="city" />
        

        <input className='form-control mb-3' placeholder='phone' type="tel" id="phone" />

        <textarea className='mb-3 form-control w-100 rounded-2'   id="details" placeholder='details'></textarea>

            {/* selection */}

        <button onClick={confirmCashPayment} type='button' className='btn btn-primary'>Confirm cash payment </button>
        <button onClick={confirmOnlinePayment}  type='button' className='ms-2 btn text-white' style={{backgroundColor:"#dc143c"}}>Confirm online payment </button>

        </form>

    </div>
  
  
  
  </>
}



