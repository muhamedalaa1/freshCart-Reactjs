import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
  const { removeAllCart, updateCount, removeItem, numOfCartItems, cartProducts, totalCartPrice } = useContext(cartContext)

  async function getupdate(id, count) {
    if (count < 1) return
    const res = await updateCount(id, count)
    if (res.status === "success") toast.success("Quantity updated")
    else toast.error("Couldn't update quantity")
  }
  async function removeSpecificCartItem(productId) {
    const res = await removeItem(productId)
    if (res.status === "success") toast.success("Removed from your cart")
    else toast.error("Couldn't remove this item")
  }
  async function deleteAllCart() {
    const res = await removeAllCart()
    if (res.message === "success") toast.success("Your cart is now empty")
    else toast.error("Couldn't clear your cart")
  }

  if (cartProducts === null || cartProducts.length === 0) return <main className="container fc-cart-page"><Helmet><title>Your cart | FreshCart</title></Helmet><div className="fc-empty fc-empty-cart"><div className="fc-empty-icon"><i className="fa-solid fa-basket-shopping" /></div><span className="section-eyebrow">Your basket is waiting</span><h2>Your cart is empty</h2><p>Find something fresh and make it yours.</p><Link className="fc-primary-btn" to="/products">Explore products <i className="fa-solid fa-arrow-right ms-2" /></Link></div></main>

  return <>
    <Helmet><title>Your cart | FreshCart</title></Helmet>
    <main className="container fc-cart-page">
      <div className="page-heading"><span className="section-eyebrow">Almost yours</span><h1>Your shopping cart</h1><p className="text-muted">{numOfCartItems} items selected for you</p></div>
      <div className="row g-4 align-items-start">
        <div className="col-lg-8">
          <div className="fc-cart-list">
            {cartProducts.map((item, index) => <div className="fc-cart-item" key={item.product.id || index}>
              <img src={item.product.imageCover} alt={item.product.title} />
              <div className="fc-cart-item-main"><span className="fc-product-category">{item.product.category.name}</span><h3>{item.product.title}</h3><button className="fc-remove-link" onClick={() => removeSpecificCartItem(item.product.id)}><i className="fa-regular fa-trash-can me-1" />Remove</button></div>
              <div className="fc-cart-item-side"><strong>{item.price * item.count} EGP</strong><div className="fc-quantity"><button onClick={() => getupdate(item.product.id, item.count - 1)} aria-label="Decrease quantity">−</button><span>{item.count}</span><button onClick={() => getupdate(item.product.id, item.count + 1)} aria-label="Increase quantity">+</button></div></div>
            </div>)}
          </div>
          <button onClick={deleteAllCart} className="fc-clear-cart"><i className="fa-regular fa-trash-can me-2" />Clear cart</button>
        </div>
        <div className="col-lg-4"><aside className="fc-order-summary"><span className="section-eyebrow">Order overview</span><h3>Order summary</h3><div className="fc-summary-line"><span>Items</span><strong>{numOfCartItems}</strong></div><div className="fc-summary-line"><span>Subtotal</span><strong>{totalCartPrice} EGP</strong></div><div className="fc-summary-line"><span>Delivery</span><strong className="fc-muted-value">Calculated at checkout</strong></div><div className="fc-summary-total"><span>Total</span><strong>{totalCartPrice} EGP</strong></div><Link to="/payment" className="fc-primary-btn w-100">Continue to checkout <i className="fa-solid fa-arrow-right ms-2" /></Link><p className="fc-secure-note"><i className="fa-solid fa-shield-halved me-2" />A smooth and secure checkout</p></aside></div>
      </div>
    </main>
  </>
}
