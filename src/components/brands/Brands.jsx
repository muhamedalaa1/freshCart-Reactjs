import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {
  const { data, isLoading, isError } = useQuery("allBrands", () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  )

  if (isLoading) return <div className="fc-loading"><ThreeDots height="70" width="70" color="#16834a" visible /></div>
  if (isError) return <div className="container py-5"><div className="fc-empty"><h3>Couldn't load brands</h3><p>Please try again in a moment.</p></div></div>

  return <>
    <Helmet><title>Shop by brand | FreshCart</title></Helmet>
    <main className="container fc-directory-page">
      <div className="fc-directory-heading"><span className="section-eyebrow">Brands you love</span><h1 className="section-title">Explore our brands</h1><p>Choose a brand to see its available products.</p></div>
      <div className="row g-4">
        {data?.data?.data?.map(brand => <div className="col-6 col-md-4 col-lg-3" key={brand._id}>
          <Link className="fc-brand-card" to={`/products?brand=${brand._id}`}>
            <div className="fc-brand-image"><img src={brand.image} alt={brand.name} loading="lazy" /></div>
            <span>{brand.name} <i className="fa-solid fa-arrow-right" /></span>
          </Link>
        </div>)}
      </div>
    </main>
  </>
}
