import axios from 'axios'
import React, { useContext, useMemo, useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import HomeSlider from '../homeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link, useSearchParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../context/wishlistContext'

const INITIAL_PRODUCT_LIMIT = 8

export default function Products() {
  const { addProductToCart } = useContext(cartContext)
  const { addProductToWishlist, removeWishItem, wishlistStatus } = useContext(wishlistContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('category')
  const brandId = searchParams.get('brand')

  useEffect(() => setShowAll(false), [searchTerm, categoryId, brandId])

  async function addProduct(id) {
    const res = await addProductToCart(id)
    if (res?.status === "success") toast.success("Added to your cart")
    else toast.error(res?.message || "Couldn't add this product to your cart")
  }

  async function toggleWishlist(id) {
    if (wishlistStatus[id]) {
      const res = await removeWishItem(id)
      if (res?.status === "success") toast.info("Removed from your wishlist")
      else toast.error(res?.message || "Couldn't remove this product")
      return
    }
    const res = await addProductToWishlist(id)
    if (res?.status === "success") toast.success("Added to your wishlist")
    else toast.error(res?.message || "Couldn't add this product")
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  const { data, isLoading, isError } = useQuery("allProduct", getAllProducts)
  const products = data?.data?.data || []
  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryId || product.category?._id === categoryId
    const matchesBrand = !brandId || product.brand?._id === brandId
    return matchesSearch && matchesCategory && matchesBrand
  }), [products, searchTerm, categoryId, brandId])
  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, INITIAL_PRODUCT_LIMIT)

  if (isLoading) return <div className="fc-loading"><ThreeDots height="70" width="70" color="#16834a" visible /></div>
  if (isError) return <div className="container py-5"><div className="fc-empty"><h3>We couldn't load the products</h3><p>Please check your connection and try again.</p></div></div>

  return <>
    <Helmet><title>FreshCart | Shop fresh</title></Helmet>
    <main className="fc-storefront">
      <div className="container">
        {!categoryId && !brandId && <>
          <div className="fc-hero-layout">
            <div className="fc-hero-main"><HomeSlider /></div>
            <div className="fc-hero-side">
              <div className="fc-promo-card fc-promo-one"><span>GOOD FOOD, GOOD MOOD</span><h3>Make every meal<br />a little fresher.</h3><i className="fa-solid fa-leaf" /></div>
              <div className="fc-promo-card fc-promo-two"><span>YOUR DAILY ESSENTIALS</span><h3>Everyday goodness<br />in one place.</h3><i className="fa-solid fa-basket-shopping" /></div>
            </div>
          </div>
          <section className="fc-category-section">
            <div className="d-flex justify-content-between align-items-end mb-3"><div><span className="section-eyebrow">Explore the aisles</span><h2 className="section-title mb-0">Shop by category</h2></div><Link className="fc-view-link" to="/Categories">All categories <i className="fa-solid fa-arrow-right ms-1" /></Link></div>
            <CategorySlider />
          </section>
        </>}
        <section id="fresh-products" className="fc-products-section">
          <div className="fc-products-heading">
            <div><span className="section-eyebrow">Picked for your table</span><h2 className="section-title mb-1">{categoryId ? "Category products" : brandId ? "Brand products" : "Popular right now"}</h2><p className="text-muted mb-0">{filteredProducts.length} products to explore.</p></div>
            <div className="fc-search"><i className="fa-solid fa-magnifying-glass" /><input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search products..." aria-label="Search products" /></div>
          </div>
          <div className="row g-4">
            {visibleProducts.map(product => <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <article className="fc-product-card">
                <div className="fc-product-image-wrap">
                  <Link to={`/productDetails/${product.id}`}><img className="fc-product-image" src={product.imageCover} alt={product.title} loading="lazy" /></Link>
                  <button type="button" aria-label={wishlistStatus[product.id] ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(product.id)} className={`fc-wishlist-btn ${wishlistStatus[product.id] ? 'is-active' : ''}`}><i className={wishlistStatus[product.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} /></button>
                  <span className="fc-product-tag">Fresh pick</span>
                </div>
                <div className="fc-product-info">
                  <span className="fc-product-category">{product.category?.name}</span>
                  <Link to={`/productDetails/${product.id}`}><h3 className="fc-product-title">{product.title.split(" ").slice(0, 5).join(" ")}</h3></Link>
                  <div className="d-flex justify-content-between align-items-center mb-3"><strong className="fc-product-price">{product.price} <small>EGP</small></strong><span className="fc-rating"><i className="fa-solid fa-star" /> {product.ratingsAverage}</span></div>
                  <button onClick={() => addProduct(product.id)} className="fc-add-btn"><i className="fa-solid fa-plus me-2" />Add to cart</button>
                </div>
              </article>
            </div>)}
          </div>
          {filteredProducts.length === 0 && <div className="fc-empty mt-4"><i className="fa-solid fa-magnifying-glass mb-3" /><h4>No products found</h4><p>Try another search term or browse the full shop.</p><Link to="/products" className="fc-primary-btn">Clear filters</Link></div>}
          {filteredProducts.length > INITIAL_PRODUCT_LIMIT && <div className="fc-show-all-wrap"><button type="button" className="fc-show-all-btn" onClick={() => setShowAll(value => !value)}>{showAll ? "Show fewer products" : `Show all ${filteredProducts.length} products`} <i className={showAll ? "fa-solid fa-chevron-up ms-2" : "fa-solid fa-arrow-right ms-2"} /></button></div>}
        </section>
      </div>
    </main>
  </>
}
