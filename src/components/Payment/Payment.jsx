import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'

export default function Payment() {
  const { cartId, totalCartPrice, setTotalCartPrice, setCartProducts, setNumOfCartItems } = useContext(cartContext)
  const [shipping, setShipping] = useState({ city: '', phone: '', details: '' })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  function updateField(event) {
    setShipping(previous => ({ ...previous, [event.target.name]: event.target.value }))
  }

  function validateShipping() {
    if (!shipping.city.trim() || !shipping.phone.trim() || !shipping.details.trim()) {
      toast.warning("Please complete your city, phone number and address details.")
      return false
    }
    if (!/^[+0-9\s()-]{8,20}$/.test(shipping.phone.trim())) {
      toast.warning("Please enter a valid phone number.")
      return false
    }
    return true
  }

  async function confirmCashPayment() {
    if (!validateShipping()) return
    setSubmitting(true)
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        shippingAddress: { details: shipping.details, phone: shipping.phone, city: shipping.city }
      }, { headers: { token: localStorage.getItem('tkn') } })

      if (data.status === "success") {
        setTotalCartPrice(0)
        setCartProducts([])
        setNumOfCartItems(0)
        toast.success("Your cash order has been confirmed!")
        navigate("/allorders")
      } else {
        toast.error(data.message || "We couldn't confirm your order.")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment couldn't be confirmed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function confirmOnlinePayment() {
    if (!validateShipping()) return
    setSubmitting(true)
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(window.location.origin)}`, {
        shippingAddress: { details: shipping.details, phone: shipping.phone, city: shipping.city }
      }, { headers: { token: localStorage.getItem('tkn') } })
      window.location.assign(data.session.url)
    } catch (error) {
      toast.error(error.response?.data?.message || "Couldn't start online payment. Please try again.")
      setSubmitting(false)
    }
  }

  return <>
    <Helmet><title>Checkout | FreshCart</title></Helmet>
    <main className="container fc-checkout-page">
      <div className="fc-checkout-heading"><span className="section-eyebrow">Almost there</span><h1 className="section-title">Delivery & payment</h1><p>Where should we deliver your basket?</p></div>
      <div className="row g-4 align-items-start">
        <div className="col-lg-7">
          <section className="fc-checkout-card">
            <div className="fc-checkout-card-title"><span className="fc-checkout-step">1</span><div><h2>Delivery address</h2><p>Enter the details for your delivery.</p></div></div>
            <div className="fc-form-grid">
              <label className="fc-form-field"><span>City</span><input name="city" value={shipping.city} onChange={updateField} placeholder="e.g. Mansoura" autoComplete="address-level2" required /></label>
              <label className="fc-form-field"><span>Phone number</span><input name="phone" type="tel" value={shipping.phone} onChange={updateField} placeholder="Your contact number" autoComplete="tel" required /></label>
              <label className="fc-form-field fc-form-field-full"><span>Full address & delivery notes</span><textarea name="details" value={shipping.details} onChange={updateField} placeholder="Street, building, apartment and any helpful directions..." rows="4" required /></label>
            </div>
          </section>
        </div>
        <div className="col-lg-5">
          <aside className="fc-checkout-card fc-checkout-summary">
            <div className="fc-checkout-card-title"><span className="fc-checkout-step">2</span><div><h2>Order summary</h2><p>Review your basket total.</p></div></div>
            <div className="fc-checkout-total-row"><span>Items total</span><strong>{(totalCartPrice || 0).toLocaleString()} EGP</strong></div>
            <div className="fc-checkout-total-row"><span>Delivery</span><strong>Calculated on delivery</strong></div>
            <div className="fc-checkout-grand-total"><span>Total</span><strong>{(totalCartPrice || 0).toLocaleString()} EGP</strong></div>
            <button type="button" onClick={confirmCashPayment} disabled={submitting} className="fc-checkout-cash"><i className="fa-solid fa-money-bill-wave me-2" />{submitting ? 'Please wait...' : 'Confirm cash on delivery'}</button>
            <button type="button" onClick={confirmOnlinePayment} disabled={submitting} className="fc-checkout-online"><i className="fa-regular fa-credit-card me-2" />Pay online</button>
            <Link to="/cart" className="fc-back-cart"><i className="fa-solid fa-arrow-left me-2" />Back to cart</Link>
            <p className="fc-checkout-secure"><i className="fa-solid fa-lock me-1" /> Your details are used only to process this order.</p>
          </aside>
        </div>
      </div>
    </main>
  </>
}
