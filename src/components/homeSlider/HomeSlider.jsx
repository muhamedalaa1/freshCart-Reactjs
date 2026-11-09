import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function HomeSlider() {
  const settings = { dots: true, infinite: true, slidesToShow: 1, slidesToScroll: 1, arrows: false, autoplay: true, autoplaySpeed: 5000, pauseOnHover: true }
  return <div className="fc-hero-slider">
    <Slider {...settings}>
      <div><div className="fc-hero-slide"><img src={require('../../images/slider-image-1.jpeg')} alt="Fresh groceries" /><div className="fc-hero-copy"><span>FRESHNESS, DELIVERED</span><h1>Good food.<br /><em>Great days.</em></h1><p>Bring home the freshest picks for every moment.</p><a href="#fresh-products" className="fc-hero-cta">Explore products <i className="fa-solid fa-arrow-right ms-2" /></a></div></div></div>
      <div><div className="fc-hero-slide"><img src={require('../../images/slider-image-2.jpeg')} alt="Fresh food selection" /><div className="fc-hero-copy"><span>MADE FOR EVERYDAY</span><h1>Fresh choices<br /><em>made simple.</em></h1><p>Your daily essentials, thoughtfully picked.</p><a href="#fresh-products" className="fc-hero-cta">Shop now <i className="fa-solid fa-arrow-right ms-2" /></a></div></div></div>
      <div><div className="fc-hero-slide"><img src={require('../../images/slider-image-3.jpeg')} alt="Fresh market selection" /><div className="fc-hero-copy"><span>A BETTER WAY TO SHOP</span><h1>Fill your basket<br /><em>with goodness.</em></h1><p>Discover something delicious today.</p><a href="#fresh-products" className="fc-hero-cta">Discover more <i className="fa-solid fa-arrow-right ms-2" /></a></div></div></div>
      <div><div className="fc-hero-slide"><img src={require('../../images/slider-2.jpeg')} alt="FreshCart groceries" /><div className="fc-hero-copy"><span>YOUR MARKETPLACE</span><h1>Everyday fresh.<br /><em>Everyday easy.</em></h1><p>All your favourites in one happy place.</p><a href="#fresh-products" className="fc-hero-cta">Start shopping <i className="fa-solid fa-arrow-right ms-2" /></a></div></div></div>
    </Slider>
  </div>
}
