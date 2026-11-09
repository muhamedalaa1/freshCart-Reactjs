import axios from 'axios'
import React, { useContext, useMemo, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../context/wishlistContext'

const notify = {
  success: message => toast.success(message, { containerId: 'freshcart-notifications' }),
  error: message => toast.error(message, { containerId: 'freshcart-notifications' }),
  info: message => toast.info(message, { containerId: 'freshcart-notifications' }),
}

export default function Products() {
  const { addProductToCart } = useContext(cartContext)
  const { addProductToWishlist, removeWishItem, wishlistStatus } = useContext(wishlistContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minRating, setMinRating] = useState('0')
  const [sortBy, setSortBy] = useState('recommended')

  const categoryId = searchParams.get('category') || ''
  const brandId = searchParams.get('brand') || ''

  const { data, isLoading, isError } = useQuery('allProduct', () =>
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
  )
  const { data: categoriesData } = useQuery('allCategory', () =>
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  )
  const { data: brandsData } = useQuery('allBrands', () =>
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  )

  const products = data?.data?.data || []
  const categories = categoriesData?.data?.data || []
  const brands = brandsData?.data?.data || []

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const result = products.filter(product => {
      const title = product.title?.toLowerCase() || ''
      const categoryName = product.category?.name?.toLowerCase() || ''
      const brandName = product.brand?.name?.toLowerCase() || ''
      const price = Number(product.price) || 0
      const rating = Number(product.ratingsAverage) || 0
      const matchesSearch = !term || title.includes(term) || categoryName.includes(term) || brandName.includes(term)
      const matchesCategory = !categoryId || product.category?._id === categoryId
      const matchesBrand = !brandId || product.brand?._id === brandId
      const matchesMinPrice = minPrice === '' || price >= Number(minPrice)
      const matchesMaxPrice = maxPrice === '' || price <= Number(maxPrice)
      const matchesRating = rating >= Number(minRating)
      return matchesSearch && matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice && matchesRating
    })

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0))
    if (sortBy === 'name') result.sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [products, searchTerm, categoryId, brandId, minPrice, maxPrice, minRating, sortBy])

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  function clearFilters() {
    setSearchTerm('')
    setMinPrice('')
    setMaxPrice('')
    setMinRating('0')
    setSortBy('recommended')
    setSearchParams({})
  }

  async function addProduct(id) {
    try {
      const res = await addProductToCart(id)
      if (res?.status === 'success') notify.success('Added to your cart')
      else notify.error(res?.message || "Couldn't add this product to your cart")
    } catch (error) {
      notify.error(error?.response?.data?.message || "Couldn't add this product to your cart")
    }
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
    } catch (error) {
      notify.error(error?.response?.data?.message || "Couldn't update your wishlist")
    }
  }

  if (isLoading) return <div className="fc-loading"><ThreeDots height="70" width="70" color="#16834a" visible /></div>
  if (isError) return <div className="container py-5"><div className="fc-empty"><h3>We couldn't load the products</h3><p>Please check your connection and try again.</p></div></div>

  return <>
    <Helmet><title>All products & filters | FreshCart</title></Helmet>
    <main className="fc-products-page">
      <div className="container">
        <header className="fc-products-page-heading">
          <div><span className="section-eyebrow">THE FRESHCART COLLECTION</span><h1>Find your fresh favourites.</h1><p>Browse every product and narrow your search with our shop filters.</p></div>
          <div className="fc-products-total"><strong>{filteredProducts.length}</strong><span>products found</span></div>
        </header>

        <section className="fc-filter-panel" aria-label="Product filters">
          <div className="fc-filter-topline"><div><i className="fa-solid fa-sliders me-2" />Refine your search</div><button type="button" onClick={clearFilters}>Clear all filters <i className="fa-solid fa-rotate-left ms-1" /></button></div>
          <div className="fc-filter-grid">
            <label className="fc-filter-field fc-filter-search"><span>Search products</span><div><i className="fa-solid fa-magnifying-glass" /><input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Product, category or brand..." /></div></label>
            <label className="fc-filter-field"><span>Category</span><select value={categoryId} onChange={e => updateParam('category', e.target.value)}><option value="">All categories</option>{categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}</select></label>
            <label className="fc-filter-field"><span>Brand</span><select value={brandId} onChange={e => updateParam('brand', e.target.value)}><option value="">All brands</option>{brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}</select></label>
            <div className="fc-filter-field"><span>Price range (EGP)</span><div className="fc-price-range"><input type="number" min="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" aria-label="Minimum price" /><span>—</span><input type="number" min="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" aria-label="Maximum price" /></div></div>
            <label className="fc-filter-field"><span>Minimum rating</span><select value={minRating} onChange={e => setMinRating(e.target.value)}><option value="0">Any rating</option><option value="3">3 stars & up</option><option value="4">4 stars & up</option><option value="4.5">4.5 stars & up</option></select></label>
            <label className="fc-filter-field"><span>Sort by</span><select value={sortBy} onChange={e => setSortBy(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option><option value="name">Name: A to Z</option></select></label>
          </div>
          {(categoryId || brandId) && <div className="fc-active-filters"><span>Active filters:</span>{categoryId && <button type="button" onClick={() => updateParam('category', '')}>{categories.find(item => item._id === categoryId)?.name || 'Category'} <i className="fa-solid fa-xmark" /></button>}{brandId && <button type="button" onClick={() => updateParam('brand', '')}>{brands.find(item => item._id === brandId)?.name || 'Brand'} <i className="fa-solid fa-xmark" /></button>}</div>}
        </section>

        <div className="fc-products-results-bar"><span>Showing <strong>{filteredProducts.length}</strong> matching products</span><Link to="/" className="fc-back-home"><i className="fa-solid fa-arrow-left me-2" />Back to home</Link></div>
        <div className="row g-4">
          {filteredProducts.map(product => <div key={product.id} className="col-6 col-md-4 col-lg-3">
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
        {filteredProducts.length === 0 && <div className="fc-empty mt-4"><i className="fa-solid fa-filter mb-3" /><h4>No products match these filters</h4><p>Try changing your search or clearing some filters.</p><button type="button" onClick={clearFilters} className="fc-primary-btn">Clear filters</button></div>}
      </div>
    </main>
  </>
}
