import React from 'react'
import paypal from "../../images/footer/paypal.svg"
import americanExpress from "../../images/footer/american-express.svg"
import mastercard from "../../images/footer/mastercard.svg"
import amazonPay from "../../images/footer/amazon.svg"
import googlePlay from "../../images/footer/google-play.svg"
import styles from "./footer.module.css"

export default function Footer() {
  return <>

  <div style={{backgroundColor:"#ECECEC"}} className='p-3 mt-5'>
    <h4>Get the FreshCart app</h4>
    <p className='text-muted'> We will send you a link, open it on your phone and download the app </p>
    <div className='d-flex align-items-center mb-4'>
      <div className="container-fluid p-0">
        <div className="row">

          <div className="col-lg-9">
            <input type="email" placeholder='Email' className=' me-3 mb-3 form-control'/>
          </div>
          <div className="col-lg-3">
            <button className='btn btn-success'>Share App Link </button>
          </div>


        </div>
      </div>
    </div>


    <div className='d-flex justify-content-between align-items-center'>

      <div className="container-fluid p-0">
        <div className="row">

          <div className=" col-lg-6 col-md-12">
            <div className={`${styles.payment} 'd-flex align-items-center'`}>
        <h5 className='me-4 mb-0'>Payment Partners</h5>
        <ul className='list-unstyled d-flex align-align-items-center mb-0'>
          <li className={`${styles.brandsMargins}`}><img src={amazonPay} alt="" /></li>
          <li className={`${styles.brandsMargins}`}><img src={americanExpress} alt="" /></li>
          <li className={`${styles.brandsMargins}`}><img src={mastercard} alt="" /></li>
          <li className={`${styles.brandsMargins}`}><img style={{width:"64px" , height:"64px"}} src={paypal} alt="" /></li>
        </ul>
            </div>
          </div>

          <div className=" col-lg-6 col-md-12">
            <div className={`${styles.getDeliveries} 'd-flex align-items-center'`}>
                <h5 className='me-2'>Get deliveries with FreshCart</h5>
                <div className='bg-black text-white d-flex align-items-center rounded p-1'>
                  <i style={{fontSize:'25px'}} class="fa-brands fa-apple me-1"></i> 
                  <div>
                    <span style={{fontSize:'10px'}}>Available in the</span>
                    <p style={{fontSize:'12px'}}>App store</p>
                  </div>
                </div>

                <div className={`${styles.googlePlay} '  bg-black text-white d-flex align-items-center rounded p-1'`}>
                  <img style={{width:'23px'}} src={googlePlay} alt="" />
                  <div>
                    <span style={{fontSize:'10px'}}>Get it on</span>
                    <p style={{fontSize:'12px'}}>Google Play</p>
                  </div>
                </div>

            </div>
          </div>

        </div>
      </div>


      
    </div>
  </div>
  </>
}
