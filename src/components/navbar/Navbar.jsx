import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoImg from "../../images/freshcart-logo.svg"
import { authContext } from '../../context/authContext'
import { cartContext } from '../../context/cartContext'
import { wishlistContext } from '../../context/wishlistContext'

export default function Navbar() {
  const { numOfCartItems } = useContext(cartContext)
  const { token, setToken } = useContext(authContext)
  const { numOfWishlistItems } = useContext(wishlistContext)
  const navigate = useNavigate()

  function logingOut() {
    setToken(null)
    localStorage.removeItem("tkn")
    navigate("/login")
  }

  const linkClass = ({ isActive }) => `fc-nav-link${isActive ? ' active' : ''}`

  return (
    <>
      <div className="fc-topline">
        <div className="container d-flex justify-content-between align-items-center">
          <span><i className="fa-solid fa-truck-fast me-2" />Fresh picks, delivered with care</span>
          <span className="d-none d-sm-inline">Freshness you can trust, every day.</span>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg fc-navbar">
        <div className="container">
          <Link className="navbar-brand fc-brand" to={token ? "/" : "/Login"}>
            <img src={logoImg} alt="FreshCart" />
          </Link>
          <button className="navbar-toggler fc-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#freshCartNav" aria-controls="freshCartNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="freshCartNav">
            {token && <ul className="navbar-nav mx-lg-auto align-items-lg-center gap-lg-2 py-3 py-lg-0">
              <li className="nav-item"><NavLink end className={linkClass} to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className={linkClass} to="/Products">Products</NavLink></li>
              <li className="nav-item"><NavLink className={linkClass} to="/Categories">Categories</NavLink></li>
              <li className="nav-item"><NavLink className={linkClass} to="/Brands">Brands</NavLink></li>
              <li className="nav-item"><NavLink className={linkClass} to="/allorders">My orders</NavLink></li>
            </ul>}
            <div className="fc-nav-actions ms-lg-auto d-flex align-items-center gap-2 pb-3 pb-lg-0">
              {token ? <>
                <Link className="fc-icon-link" to="/wishlist" aria-label="Wishlist"><i className="fa-regular fa-heart" /><span className="fc-count">{numOfWishlistItems}</span></Link>
                <Link className="fc-icon-link" to="/cart" aria-label="Shopping cart"><i className="fa-solid fa-bag-shopping" /><span className="fc-count">{numOfCartItems}</span></Link>
                <Link className="fc-account-link" to="/profile"><i className="fa-regular fa-user me-2" />Account</Link>
                <button onClick={logingOut} className="fc-logout">Log out</button>
              </> : <>
                <Link className="fc-account-link" to="/Login">Log in</Link>
                <Link className="fc-join-btn" to="/Register">Create account <i className="fa-solid fa-arrow-right ms-2" /></Link>
              </>}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
