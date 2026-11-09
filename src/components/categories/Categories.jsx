import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categories() {
  const { data, isLoading, isError } = useQuery("allCategory", () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  )

  if (isLoading) return <div className="fc-loading"><ThreeDots height="70" width="70" color="#16834a" visible /></div>
  if (isError) return <div className="container py-5"><div className="fc-empty"><h3>Couldn't load categories</h3><p>Please try again in a moment.</p></div></div>

  return <>
    <Helmet><title>Shop by category | FreshCart</title></Helmet>
    <main className="container fc-directory-page">
      <div className="fc-directory-heading"><span className="section-eyebrow">Find your favourites</span><h1 className="section-title">Shop by category</h1><p>Choose an aisle and discover products picked for you.</p></div>
      <div className="row g-4">
        {data?.data?.data?.map(category => <div className="col-6 col-md-4 col-lg-3" key={category._id}>
          <Link className="fc-directory-card" to={`/products?category=${category._id}`}>
            <div className="fc-directory-image"><img src={category.image} alt={category.name} loading="lazy" /></div>
            <div className="fc-directory-card-copy"><h2>{category.name}</h2><span>Explore category <i className="fa-solid fa-arrow-right" /></span></div>
          </Link>
        </div>)}
      </div>
    </main>
  </>
}
