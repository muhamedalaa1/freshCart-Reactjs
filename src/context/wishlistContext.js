import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [wishlistStatus, setWishlistStatus] = useState({});

  async function getUserWishlist() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("tkn") },
      });
      const products = data.data || [];
      setNumOfWishlistItems(data.count ?? products.length);
      setWishlistProducts(products);
      setWishlistStatus(products.reduce((status, item) => {
        status[item.id] = true;
        return status;
      }, {}));
      return data;
    } catch (error) {
      console.error("Unable to load wishlist", error);
      return null;
    }
  }

  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setWishlistStatus((previous) => ({ ...previous, [productId]: true }));
      await getUserWishlist();
      return data;
    } catch (error) {
      console.error("Unable to add wishlist item", error);
      return error.response?.data || { status: "error", message: "Couldn't add this product to your wishlist." };
    }
  }

  async function removeWishItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setWishlistStatus((previous) => ({ ...previous, [productId]: false }));
      await getUserWishlist();
      return data;
    } catch (error) {
      console.error("Unable to remove wishlist item", error);
      return error.response?.data || { status: "error", message: "Couldn't remove this product from your wishlist." };
    }
  }

  useEffect(() => {
    if (localStorage.getItem("tkn")) getUserWishlist();
  }, []);

  return (
    <wishlistContext.Provider value={{
      getUserWishlist,
      removeWishItem,
      addProductToWishlist,
      numOfWishlistItems,
      wishlistProducts,
      setWishlistProducts,
      setNumOfWishlistItems,
      setWishlistStatus,
      wishlistStatus,
    }}>
      {children}
    </wishlistContext.Provider>
  );
}
