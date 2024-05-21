/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CoinList, TrendCoins } from "../api/AllApi";

export const AllCryptoContext = createContext();
export function numberWithCommasToPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const AllCryptoProvider = ({ children }) => {
  const [allCoinList, setAllCoinList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  //////////////////watchList//////////

  const handleIsOpen = () => {
    // e.prevetDefault();
    setIsOpen(!isOpen);
  };

  //hero section api that it is working automatically right ////////////////
  const fetchAllCrypto = async () => {
    try {
      const res = await axios.get(TrendCoins(currency));
      const data = await res.data;
      setTrending(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCrypto();
  }, [currency]);

  //////////////////////singlePage api funtionality////////////////////

  //////////////////////////////////////////

  ////////////////////////////////////
  const fetchCoinList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(CoinList(currency));
      const data = await res.data;
      setAllCoinList(data);
    } catch (error) {
      console.log("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  ///////this is currency funtionality that changes when select is transfered.///////////
  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "EUR") {
      setSymbol("€");
    }
  }, [currency]);
  ///////////////////////////

  return (
    <AllCryptoContext.Provider
      value={{
        trending,
        currency,
        setCurrency,
        symbol,
        allCoinList,
        loading,
        isOpen,
        setIsOpen,
        handleIsOpen,
      }}
    >
      {children}
    </AllCryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  return useContext(AllCryptoContext);
};
