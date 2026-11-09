import { useContext, useState } from "react"
import { wishlistContext } from "../../context/wishlistContext"
import { cartContext } from "../../context/cartContext"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

const notify = {
  success: message => toast.success(message, { containerId: "freshcart-notifications" }),
  error: message => toast.error(message, { containerId: "freshcart-notifications" }),
}

export default function Wishlist() {
  const { wishlistProducts, numOfWishlistItems, removeWishItem, setWishlistStatus } = useContext(wishlistContext)
  const { addProductToCart } = useContext(cartContext)
  const [removingId, setRemovingId] = useState(null)
  const [addingId, setAddingId] = useState(null)

  async function removeItemFromWish(id) {
    if (removingId) return
    setRemovingId(id)
    try {
      const res = await removeWishItem(id)
      if (res?.status === "success") {
        setWishlistStatus(prev => ({ ...prev, [id]: false }))
        notify.success("Removed from your wishlist")
      } else {
        notify.error(res?.message || "Couldn't remove this product")
      }
    } catch (error) {
      notify.error(error?.response?.data?.message || "Couldn't remove this product")
    } finally {
      setRemovingId(null)
    }
  }

  async function moveToCart(id) {
    if (addingId) return
    setAddingId(id)
    try {
      const res = await addProductToCart(id)
      if (res?.status === "success") notify.success("Added to your cart")
      else notify.error(res?.message || "Couldn't add this product to your cart")
    } catch (error) {
      notify.error(error?.response?.data?.message || "Couldn't add this product to your cart")
    } finally {
      setAddingId(null)
    }
  }

  const items = wishlistProducts || []
  const count = numOfWishlistItems ?? items.length

  return <>
    <Helmet><title>My Wishlist | FreshCart</title></Helmet>
    <main className="fc-wishlist-page">
      <div className="container">
        <div className="fc-wishlist-heading">
          <div>
            <span className="section-eyebrow">YOUR PERSONAL COLLECTION</span>
            <h1>My Wishlist<span>.</span></h1>
            <p>All the things you love, saved in one place.</p>
          </div>
          <div className="fc-wishlist-count">
            <span className="fc-wishlist-count-icon"><i className="fa-regular fa-heart" /></span>
            <span><strong>{count}</strong><small>{count === 1 ? "saved item" : "saved items"}</small></span>
          </div>
        </div>

        {items.length === 0 ? (
          <section className="fc-wishlist-empty">
            <div className="fc-wishlist-empty-icon"><i className="fa-regular fa-heart" /></div>
            <span className="section-eyebrow">NOTHING SAVED YET</span>
            <h2>Your wishlist is waiting.</h2>
            <p>When you find something you love, tap the heart and it will be right here.</p>
            <Link to="/products" className="fc-primary-btn">Explore products <i className="fa-solid fa-arrow-right ms-2" /></Link>
          </section>
        ) : (
          <>
            <div className="fc-wishlist-toolbar">
              <span><strong>{items.length}</strong> {items.length === 1 ? "product" : "products"} saved for later</span>
              <Link to="/products">Continue shopping <i className="fa-solid fa-arrow-right ms-2" /></Link>
            </div>
            <div className="row g-4">
              {items.map(product => (
                <div key={product.id} className="col-6 col-md-4 col-xl-3">
                  <article className="fc-wishlist-card">
                    <div className="fc-wishlist-card-image">
                      <Link to={`/productDetails/${product.id}`}>
                        <img src={product.imageCover} alt={product.title} loading="lazy" />
                      </Link>
                      <button type="button" className="fc-wishlist-remove" onClick={() => removeItemFromWish(product.id)} disabled={removingId === product.id} aria-label="Remove from wishlist" title="Remove from wishlist">
                        {removingId === product.id ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-heart" />}
                      </button>
                    </div>
                    <div className="fc-wishlist-card-info">
                      <span className="fc-product-category">{product.category?.name || "FreshCart pick"}</span>
                      <Link to={`/productDetails/${product.id}`} className="fc-wishlist-product-link">
                        <h3>{product.title}</h3>
                      </Link>
                      <div className="fc-wishlist-card-meta">
                        <strong>{product.price} <small>EGP</small></strong>
                        <span><i className="fa-solid fa-star" /> {product.ratingsAverage || "New"}</span>
                      </div>
                      <button type="button" className="fc-add-btn" onClick={() => moveToCart(product.id)} disabled={addingId === product.id}>
                        {addingId === product.id ? <><i className="fa-solid fa-spinner fa-spin me-2" />Adding...</> : <><i className="fa-solid fa-bag-shopping me-2" />Add to cart</>}
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  </>
}
