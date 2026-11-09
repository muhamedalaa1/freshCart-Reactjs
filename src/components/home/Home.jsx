import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { ThreeDots } from 'react-loader-spinner'
import { cartContext } from '../../context/cartContext'
import { wishlistContext } from '../../context/wishlistContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import HomeSlider from '../homeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

const INITIAL_PRODUCT_LIMIT = 8
const notify = {
  success: message => toast.success(message, { containerId: 'freshcart-notifications' }),
  error: message => toast.error(message, { containerId: 'freshcart-notifications' }),
  info: message => toast.info(message, { containerId: 'freshcart-notifications' }),
}
export default function Home() {
  const { addProductToCart } = useContext(cartContext)
  const { addProductToWishlist, removeWishItem, wishlistStatus } = useContext(wishlistContext)
  const [showAll, setShowAll] = useState(false)
  const { data, isLoading, isError } = useQuery('allProduct', () => axios.get('https://ecommerce.routemisr.com/api/v1/products'))
  const products = data?.data?.data || []
  const visibleProducts = showAll ? products : products.slice(0, INITIAL_PRODUCT_LIMIT)
  async function addProduct(id) {
    try {
      const res = await addProductToCart(id)
      if (res?.status === 'success') notify.success('Added to your cart')
      else notify.error(res?.message || "Couldn't add this product to your cart")
    } catch (error) { notify.error(error?.response?.data?.message || "Couldn't add this product to your cart") }
  }
  async function toggleWishlist(id) {
    try {
      if (wishlistStatus[id]) {
        const res = await removeWishItem(id)
        if (res?.status === 'success') notify.info('Removed from your wishlist')
        else notify.error(res?.message || "Couldn't remove this product")
        return
      }
      const res = await addProductToWishlist(id)
      if (res?.status === 'success') notify.success('Added to your wishlist')
      else notify.error(res?.message || "Couldn't add this product")
    } catch (error) { notify.error(error?.response?.data?.message || "Couldn't update your wishlist") }
  }
  return <>
    <Helmet><title>FreshCart | Freshness for every day</title></Helmet>
    <main className="fc-storefront">
      <div className="container">
        <div className="fc-hero-layout">
          <div className="fc-hero-main"><HomeSlider /></div>
          <div className="fc-hero-side">
            <div className="fc-promo-card fc-promo-one"><span>GOOD FOOD, GOOD MOOD</span><h3>Make every meal<br />a little fresher.</h3><i className="fa-solid fa-leaf" /></div>
            <div className="fc-promo-card fc-promo-two"><span>YOUR DAILY ESSENTIALS</span><h3>Everyday goodness<br />in one place.</h3><i className="fa-solid fa-basket-shopping" /></div>
          </div>
        </div>
        <section className="fc-category-section">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div><span className="section-eyebrow">Explore the aisles</span><h2 className="section-title mb-0">Shop by category</h2></div>
            <Link className="fc-view-link" to="/Categories">All categories <i className="fa-solid fa-arrow-right ms-1" /></Link>
          </div>
          <CategorySlider />
        </section>
        <section id="fresh-products" className="fc-products-section">
          <div className="fc-products-heading">
            <div><span className="section-eyebrow">Picked for your table</span><h2 className="section-title mb-1">Popular right now</h2><p className="text-muted mb-0">{products.length} products to explore.</p></div>
            <Link to="/products" className="fc-view-link">Browse all products <i className="fa-solid fa-arrow-right ms-1" /></Link>
          </div>
          {isLoading ? <div className="fc-loading"><ThreeDots height="60" width="60" color="#16834a" visible /></div> : isError ? <div className="fc-empty"><h3>We couldn't load the products</h3><p>Please try again in a moment.</p></div> : <>
            <div className="row g-4">
              {visibleProducts.map(product => <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <article className="fc-product-card">
                  <div className="fc-product-image-wrap">
                    <Link to={`/productDetails/${product.id}`}><img className="fc-product-image" src={product.imageCover} alt={product.title} loading="lazy" /></Link>
                    <button type="button" aria-label={wishlistStatus[product.id] ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWishlist(product.id)} className={`fc-wishlist-btn ${wishlistStatus[product.id] ? 'is-active' : ''}`}><i className={wishlistStatus[product.id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} /></button>
                    <span className="fc-product-tag">Fresh pick</span>
                  </div>
                  <div className="fc-product-info">
                    <span className="fc-product-category">{product.category?.name}</span>
                    <Link to={`/productDetails/${product.id}`}><h3 className="fc-product-title">{product.title.split(' ').slice(0, 5).join(' ')}</h3></Link>
                    <div className="d-flex justify-content-between align-items-center mb-3"><strong className="fc-product-price">{product.price} <small>EGP</small></strong><span className="fc-rating"><i className="fa-solid fa-star" /> {product.ratingsAverage}</span></div>
                    <button onClick={() => addProduct(product.id)} className="fc-add-btn"><i className="fa-solid fa-plus me-2" />Add to cart</button>
                  </div>
                </article>
              </div>)}
            </div>
            {products.length > INITIAL_PRODUCT_LIMIT && <div className="fc-show-all-wrap"><button type="button" className="fc-show-all-btn" onClick={() => setShowAll(value => !value)}>{showAll ? 'Show fewer products' : 'Show more products'} <i className={showAll ? 'fa-solid fa-chevron-up ms-2' : 'fa-solid fa-arrow-down ms-2'} /></button></div>}
          </>}
        </section>
      </div>
    </main>
  </>
}
