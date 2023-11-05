import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();


export function CartContextProvider({children}) {
  
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null)


async function removeAllCart(){

  try {
    
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
    ,{
      headers:{token:localStorage.getItem('tkn')}
    });

    setTotalCartPrice(0);
    setCartProducts([]);
    setNumOfCartItems(0);

    return data;

  } catch (error) {
    console.log("error" , error);
  }


}

async function removeItem(productId) {

    try {

    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: { token: localStorage.getItem("tkn") },
      }
    );

    console.log(data);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          setNumOfCartItems(data.numOfCartItems);

    return data


    } catch (error) {
      console.log("error", error);
    }
}

async function updateCount(productId, numOfCount) {
  try {
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        "count": numOfCount,
      },{
        headers:{token:localStorage.getItem('tkn')}
      }
    );


    setTotalCartPrice(data.data.totalCartPrice);
    setCartProducts(data.data.products);
    setNumOfCartItems(data.numOfCartItems);
    
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function addProductToCart(productId) {
      try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
          {
            "productId": productId,
          },
          { headers: { token: localStorage.getItem("tkn") } }
        ); 
          getUserCart();

        return data;
      } catch (e) {
        console.log("error", e);
      }
    }


async function getUserCart() {
       try {
         const { data } = await axios.get(
           "https://ecommerce.routemisr.com/api/v1/cart",
           {
             headers: { token: localStorage.getItem("tkn") },
           }
         );

         setCartId(data.data._id)

         setNumOfCartItems(data.numOfCartItems);
         setCartProducts(data.data.products);
         setTotalCartPrice(data.data.totalCartPrice);
       } catch (err) {
         console.log("error", err);
       }
}

useEffect( function(){
     getUserCart()
},[])
    return (
      <cartContext.Provider
        value={{
          getUserCart,
          updateCount,
          removeItem,
          addProductToCart,
          numOfCartItems,
          cartProducts,
          totalCartPrice,
          removeAllCart,
          cartId,
          setTotalCartPrice,
          setCartProducts,
          setNumOfCartItems
        }}
      >
        {children}
      </cartContext.Provider>
    );
      
}