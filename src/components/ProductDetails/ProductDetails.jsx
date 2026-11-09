import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../context/wishlistContext'

export default function ProductDetails() {
  const [productDetailsLoader, setProductDetailsLoader] = useState(false)
  const [productDetailsWishLoader, setProductDetailsWishLoader] = useState(false)
  const { addProductToCart } = useContext(cartContext)
  const { addProductToWishlist, removeWishItem, wishlistStatus } = useContext(wishlistContext)
  const { id } = useParams()

  async function addProduct(productId) {
    setProductDetailsLoader(true)
    const res = await addProductToCart(productId)
    if (res?.status === "success") toast.success("Added to your cart")
    else toast.error(res?.message || "Couldn't add this product to your cart")
    setProductDetailsLoader(false)
  }

  async function toggleWishlist(productId) {
    setProductDetailsWishLoader(true)
    const res = wishlistStatus[productId]
      ? await removeWishItem(productId)
      : await addProductToWishlist(productId)
    if (res?.status === "success") toast.success(wishlistStatus[productId] ? "Removed from your wishlist" : "Added to your wishlist")
    else toast.error(res?.message || "Couldn't update your wishlist")
    setProductDetailsWishLoader(false)
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const { data, isLoading, isError } = useQuery(["productDetails", id], getProductDetails)
  if (isLoading) return <div className="fc-loading"><ThreeDots height="70" width="70" color="#16834a" visible /></div>
  if (isError || !data?.data?.data) return <div className="container py-5"><div className="fc-empty"><h3>Product not found</h3><Link to="/products" className="fc-primary-btn">Back to shop</Link></div></div>
  const product = data.data.data
  const isWishlisted = Boolean(wishlistStatus[product.id])

  return <>
    <Helmet><title>{product.title} | FreshCart</title></Helmet>
    <main className="container fc-detail-page">
      <div className="fc-breadcrumb"><Link to="/products">Shop</Link><i className="fa-solid fa-chevron-right" /><span>{product.category.name}</span></div>
      <div className="row g-5 align-items-center">
        <div className="col-lg-6"><div className="fc-detail-image"><img src={product.imageCover} alt={product.title} /></div></div>
        <div className="col-lg-6">
          <div className="fc-detail-copy"><span className="section-eyebrow">{product.category.name}</span><h1>{product.title}</h1><div className="fc-detail-rating"><i className="fa-solid fa-star" /> {product.ratingsAverage} <span>Customer rating</span></div><p className="fc-detail-description">{product.description}</p><div className="fc-detail-price">{product.price} <small>EGP</small></div><div className="fc-stock-note"><i className="fa-solid fa-circle-check me-2" />Available for your basket</div>
            <button onClick={() => addProduct(product.id)} className="fc-add-btn fc-detail-add" disabled={productDetailsLoader}>{productDetailsLoader ? <ThreeDots height="20" width="50" color="#fff" visible /> : <><i className="fa-solid fa-bag-shopping me-2" />Add to cart</>}</button>
            <button onClick={() => toggleWishlist(product.id)} className={`fc-detail-wishlist ${isWishlisted ? 'is-active' : ''}`} disabled={productDetailsWishLoader}>{productDetailsWishLoader ? 'Please wait...' : <><i className={isWishlisted ? "fa-solid fa-heart me-2" : "fa-regular fa-heart me-2"} />{isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</>}</button>
            <div className="fc-detail-perks"><span><i className="fa-solid fa-leaf" /> Carefully selected</span><span><i className="fa-solid fa-truck-fast" /> Convenient delivery</span></div>
          </div>
        </div>
      </div>
    </main>
  </>
}
