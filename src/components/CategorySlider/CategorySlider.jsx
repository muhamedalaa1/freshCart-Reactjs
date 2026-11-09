import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import styles from "./category.module.css"

export default function CategorySlider() {
  const { data, isLoading } = useQuery("categorySlider", () =>
    axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
    { refetchOnMount: false }
  )

  const settings = {
    autoplay: true, speed: 5000, autoplaySpeed: 2000, cssEase: "linear",
    dots: true, infinite: true, slidesToShow: 7, slidesToScroll: 3, arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } }
    ]
  }

  if (isLoading) return <div className="fc-loading"><ThreeDots height="55" width="55" color="#16834a" visible /></div>

  return <div className={styles.categorySlider}>
    <Slider {...settings}>
      {data?.data?.data?.map(category => <div className="fc-category-slide" key={category._id}>
        <Link to={`/products?category=${category._id}`} className="fc-category-slide-link">
          <img src={category.image} alt={category.name} loading="lazy" />
          <p>{category.name}</p>
        </Link>
      </div>)}
    </Slider>
  </div>
}
