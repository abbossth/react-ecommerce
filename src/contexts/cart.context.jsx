import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if the cartItems contains productToAdd
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id) 
  console.log(existingCartItem);
  // if yes, just increment the quantity
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem)
  }
  else {
    // return new array with modified items
    return [...cartItems, {...productToAdd, quantity: 1 }]
  }
}
const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.map(cartItem => cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addToCartItem: {},
  total: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const totalProducts = cartItems.reduce((accumulator, current) => accumulator + current.quantity, 0)
    
    setTotalItems(totalProducts)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems,removeItemFromCart, addItemToCart, totalItems }

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}