import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const token = localStorage.getItem('tkn')
      if (!token) {
        navigate('/Login')
        return
      }
      setProfile(jwtDecode(token))
    } catch (error) {
      console.error('Unable to read account details', error)
      navigate('/Login')
    }
  }, [navigate])

  if (!profile) {
    return <div className="fc-loading"><span className="fc-profile-loader" /></div>
  }

  const displayName = profile.name || profile.username || 'FreshCart customer'
  const initials = displayName.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()
  const email = profile.email || 'Your account email'
  const accountId = profile.id || profile._id || '—'

  return <>
    <Helmet><title>My Account | FreshCart</title></Helmet>
    <main className="fc-profile-page">
      <div className="container">
        <div className="fc-profile-welcome">
          <div>
            <span className="section-eyebrow">YOUR PERSONAL SPACE</span>
            <h1>My account</h1>
            <p>Manage your details and keep track of your FreshCart activity.</p>
          </div>
          <Link to="/products" className="fc-profile-back"><i className="fa-solid fa-arrow-left" /> Continue shopping</Link>
        </div>

        <section className="fc-profile-hero">
          <div className="fc-profile-avatar">{initials || 'FC'}</div>
          <div className="fc-profile-identity">
            <span className="fc-profile-kicker"><i className="fa-solid fa-circle-check" /> ACCOUNT OVERVIEW</span>
            <h2>Welcome back, {displayName}</h2>
            <p>{email}</p>
          </div>
          <div className="fc-profile-member"><i className="fa-solid fa-leaf" /><span>FreshCart member</span></div>
        </section>

        <div className="fc-profile-content">
          <section className="fc-profile-details">
            <div className="fc-profile-section-heading">
              <div><span className="section-eyebrow">PERSONAL INFORMATION</span><h2>Account details</h2></div>
              <span className="fc-profile-lock"><i className="fa-solid fa-shield-halved" /> Secure account</span>
            </div>
            <div className="fc-profile-info-grid">
              <div className="fc-profile-info-item"><span>Full name</span><strong><i className="fa-regular fa-user" /> {displayName}</strong></div>
              <div className="fc-profile-info-item"><span>Email address</span><strong><i className="fa-regular fa-envelope" /> {email}</strong></div>
              <div className="fc-profile-info-item"><span>Account ID</span><strong><i className="fa-solid fa-fingerprint" /> {accountId}</strong></div>
              <div className="fc-profile-info-item"><span>Account type</span><strong><i className="fa-solid fa-user-check" /> Customer</strong></div>
            </div>
            <p className="fc-profile-note"><i className="fa-solid fa-circle-info" /> Your profile information is read from your signed-in account.</p>
          </section>

          <aside className="fc-profile-shortcuts">
            <span className="section-eyebrow">QUICK ACCESS</span>
            <h2>Where would you like to go?</h2>
            <Link to="/allorders" className="fc-profile-shortcut"><span className="fc-profile-shortcut-icon orders"><i className="fa-solid fa-box-open" /></span><span><strong>My orders</strong><small>View your order history</small></span><i className="fa-solid fa-chevron-right" /></Link>
            <Link to="/wishlist" className="fc-profile-shortcut"><span className="fc-profile-shortcut-icon wishlist"><i className="fa-regular fa-heart" /></span><span><strong>My wishlist</strong><small>Your saved favourites</small></span><i className="fa-solid fa-chevron-right" /></Link>
            <Link to="/cart" className="fc-profile-shortcut"><span className="fc-profile-shortcut-icon cart"><i className="fa-solid fa-bag-shopping" /></span><span><strong>Shopping cart</strong><small>Review items in your cart</small></span><i className="fa-solid fa-chevron-right" /></Link>
          </aside>
        </div>

        <div className="fc-profile-help"><div className="fc-profile-help-icon"><i className="fa-solid fa-headset" /></div><div><strong>Need a hand?</strong><p>We're here to help make your shopping experience easier.</p></div><Link to="/products">Explore the shop <i className="fa-solid fa-arrow-right" /></Link></div>
      </div>
    </main>
  </>
}
