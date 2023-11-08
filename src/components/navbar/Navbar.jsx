import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoImg from "../../images/freshcart-logo.svg"
import { authContext } from '../../context/authContext';
import { cartContext } from '../../context/cartContext';
import { wishlistContext } from '../../context/wishlistContext';

export default function Navbar() {

  const {numOfCartItems} = useContext(cartContext)
  const navigator =useNavigate()
  const {token , setToken} = useContext(authContext);
const {numOfWishlistItems} =  useContext(wishlistContext)

  function logingOut(){

    setToken(null);
    
    localStorage.removeItem("tkn")
    navigator("/login")

    
  }
  

  return <>
  

  <nav style={{boxShadow:"0 0.5rem 1rem rgb(49 173 9 / 15%)"}} className="navbar   navbar-expand-lg bg-body-tertiary py-4">
  <div className="container">
    <Link className="navbar-brand" to={"/Products"}>

      <img src={logoImg} alt="" />


    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="container collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        {token? <>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/Products"}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Brands"}>Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Categories"}>Categories</Link>
        </li>
        
        
        

        <li className="nav-item">
          <Link className="nav-link" to={"/allorders"}>All orders</Link>
        </li>
        
        </>:""}

      </ul>

        <ul className="navbar-nav align-items-center  ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <i className='fa-brands  me-2  fa-facebook-f'></i>
         <i className='fa-brands me-2  fa-twitter'></i>
         <i className='fa-brands  me-2 fa-whatsapp'></i>
         <i className='fa-brands me-2  fa-linkedin'></i>
        </li>

        {token? <>
          
          <li className="nav-item">
          <Link className="nav-link" to={"/profile"}>Profile</Link>
        </li>

        <li className="nav-item">
          <span onClick={ logingOut } style={   { cursor: "pointer" }   } className="nav-link">Logout</span>
        </li>


        <li className="nav-item">
          <Link className="nav-link position-relative" to={"/cart"}>
            
            
            <i class="fa-solid fa-cart-shopping"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {numOfCartItems}
                <span class="visually-hidden">unread messages</span>
              </span>
            
            </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link position-relative" to={"/Wishlist"}>
            
            
            <i class="fa-solid fa-heart"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {numOfWishlistItems}
                <span class="visually-hidden">unread messages</span>
              </span>
            
            </Link>
        </li>


        
        </>:<>
        
        <li className="nav-item">
          <Link className="nav-link" to={"/Register"}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Login"}>Login</Link>
        </li>
        
        
        </> }
        



      </ul>

    </div>
  </div>
</nav>
  
  </>
}
