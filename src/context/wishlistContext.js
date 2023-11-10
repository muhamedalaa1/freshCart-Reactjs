import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const wishlistContext = createContext();




export function WishlistContextProvider({ children }) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [wishlistStatus, setWishlistStatus] = useState({})
//   const [WishlistId, setWishlistId] = useState(null);

 

  async function removeWishItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );

      console.log(data);
      
      getUserWishlist()

    //   setWishlistProducts(data.data);
    //   setNumOfWishlistItems(data.data.length);

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  
  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      getUserWishlist();
        setWishlistStatus((prevStatus) => ({
          ...prevStatus,
          [productId]: true,
        }));
      return data;
    } catch (e) {
      console.log("error", e);
    }
  }

  async function getUserWishlist() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );

      console.log(data);
    //   setWishlistId(data.data._id);
      setNumOfWishlistItems(data.count);
      setWishlistProducts(data.data);
    } catch (err) {
      console.log("error", err);
    }
  }



  useEffect(function () {
    getUserWishlist();
  }, []);
  return (
    <wishlistContext.Provider
      value={{
        getUserWishlist,
        removeWishItem,
        addProductToWishlist,
        numOfWishlistItems,
        wishlistProducts,
        // WishlistId,
        setWishlistProducts,
        setNumOfWishlistItems,
        setWishlistStatus,
        wishlistStatus,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}