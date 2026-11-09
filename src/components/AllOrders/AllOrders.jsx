import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function AllOrders() {
  const [userAllOrders, setUserAllOrders] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    try {
      const token = localStorage.getItem('tkn')
      if (!token) { setLoadError(true); setUserAllOrders([]); return }
      const user = jwtDecode(token)
      axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`)
        .then(({ data }) => setUserAllOrders(data || []))
        .catch(error => { console.error("Unable to load orders", error); setLoadError(true); setUserAllOrders([]) })
    } catch (error) {
      console.error("Unable to read user session", error)
      setLoadError(true)
      setUserAllOrders([])
    }
  }, [])

  if (userAllOrders === null) return <div className="fc-loading"><ThreeDots height="70" width="70" color="#16834a" visible /></div>

  return <>
    <Helmet><title>My orders | FreshCart</title></Helmet>
    <main className="container fc-orders-page">
      <div className="fc-orders-heading"><div><span className="section-eyebrow">Your FreshCart activity</span><h1 className="section-title">My orders</h1><p>All your purchases, together in one place.</p></div><Link to="/products" className="fc-primary-btn">Continue shopping <i className="fa-solid fa-arrow-right ms-2" /></Link></div>
      {loadError && <div className="fc-empty"><h3>We couldn't load your orders</h3><p>Please refresh the page and try again.</p></div>}
      {!loadError && userAllOrders.length === 0 && <div className="fc-empty"><div className="fc-empty-icon"><i className="fa-solid fa-box-open" /></div><h3>No orders yet</h3><p>Your next favourite find is waiting.</p><Link to="/products" className="fc-primary-btn">Start shopping</Link></div>}
      {!loadError && userAllOrders.length > 0 && <div className="fc-orders-list">
        {userAllOrders.map((order, index) => <article className="fc-order-card" key={order._id || index}>
          <div className="fc-order-card-head">
            <div><span className="fc-order-label">Order #{String(order._id || index).slice(-8).toUpperCase()}</span><strong>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Order placed'}</strong></div>
            <span className={`fc-order-status ${order.isDelivered ? 'is-complete' : ''}`}>{order.isDelivered ? 'Delivered' : 'Processing'}</span>
          </div>
          <div className="fc-order-items">
            {(order.cartItems || []).map((item, itemIndex) => <div className="fc-order-item" key={item._id || item.product?._id || itemIndex}>
              <img src={item.product?.imageCover} alt={item.product?.title || 'Product'} />
              <div className="fc-order-item-copy"><strong>{item.product?.title || 'Product'}</strong><span>Quantity: {item.count}</span></div>
              <strong className="fc-order-item-price">{(item.price * item.count).toLocaleString()} EGP</strong>
            </div>)}
          </div>
          <div className="fc-order-card-foot">
            <div><span>Payment</span><strong>{order.paymentMethodType === 'cash' ? 'Cash on delivery' : order.paymentMethodType || '—'}</strong></div>
            <div><span>Deliver to</span><strong>{order.shippingAddress?.city || '—'}</strong></div>
            <div><span>Order total</span><strong className="fc-order-total">{(order.totalOrderPrice || order.cartItems?.reduce((sum, item) => sum + item.price * item.count, 0) || 0).toLocaleString()} EGP</strong></div>
          </div>
        </article>)}
      </div>}
    </main>
  </>
}
