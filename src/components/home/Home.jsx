import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import HomeSlider from '../homeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
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
        <section className="fc-home-shop-banner">
          <div><span className="section-eyebrow">YOUR NEXT FAVOURITE IS HERE</span><h2>Everything fresh, all in one place.</h2><p>Explore our complete collection and find exactly what you need.</p></div>
          <Link to="/products" className="fc-primary-btn">Explore all products <i className="fa-solid fa-arrow-right ms-2" /></Link>
        </section>
      </div>
    </main>
  </>
}
