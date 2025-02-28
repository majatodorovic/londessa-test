"use client";
import { useContext, useState, createContext, useEffect } from "react";

export const userContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  productsInWishlist: [],
  setProductsInWishlist: () => {},
  removeProduct: () => {},
});

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productsInWishlist, setProductsInWishlist] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("loggedIn", isLoggedIn);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("loggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const setLoggedIn = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem("loggedIn", value);
  };

  const setProduct = (val) => {
    setProductsInWishlist((prev) => [...prev, val]);
    localStorage.setItem("productsInWishlist", JSON.stringify(val));
  };

  const removeProduct = (val) => {
    setProductsInWishlist((prev) => prev.filter((item) => item !== val));
    localStorage.setItem("productsInWishlist", JSON.stringify(val));
  };

  useEffect(() => {
    const productsInWishlist = localStorage.getItem("productsInWishlist");
    if (productsInWishlist) {
      setProductsInWishlist(JSON.parse(productsInWishlist));
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        isLoggedIn: isLoggedIn ? isLoggedIn : false,
        setIsLoggedIn: setLoggedIn,
        productsInWishlist: productsInWishlist,
        setProductsInWishlist: setProduct,
        removeProduct: removeProduct,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
