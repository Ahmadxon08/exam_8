/* eslint-disable no-unused-vars */
import {
  numberWithCommasToPrice,
  useCryptoContext,
} from "../../context/Context";
import "./Table.scss";
import { useState, useMemo, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";

const TableComponents = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const { allCoinList, loading, symbol } = useCryptoContext();
  const [savedCoins, setSavedCoins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCoins")) || [];
    setSavedCoins(saved);
  }, []);

  const handleSaveToLocalStorage = (crypto) => {
    let updatedSavedCoins;
    if (savedCoins.some((coin) => coin.id === crypto.id)) {
      updatedSavedCoins = savedCoins.filter((coin) => coin.id !== crypto.id);
    } else {
      updatedSavedCoins = [...savedCoins, crypto];
    }
    localStorage.setItem("savedCoins", JSON.stringify(updatedSavedCoins));
    setSavedCoins(updatedSavedCoins);
  };

  const isCoinSaved = (cryptoId) => {
    return savedCoins.some((coin) => coin.id === cryptoId);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredCoins = useMemo(() => {
    return allCoinList?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchText) ||
        coin.symbol.toLowerCase().includes(searchText)
    );
  }, [allCoinList, searchText]);

  return (
    <div>
      <section className="body">
        <div className="container">
          <div className="body_head">
            <h1>Cryptocurrency Prices by Market Cap</h1>
          </div>
          <div className="search">
            <input
              type="search"
              onChange={handleSearchChange}
              placeholder="Search For a Crypto Currency.."
              name="search"
            />
          </div>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "87ceeb" }} />
          ) : (
            <>
              <div className="table_head">
                <div className="id">
                  <span>Coin</span>
                </div>
                <div className="others">
                  <span className="first">Price</span>
                  <span className="second">24h Change</span>
                  <span>Market Cap</span>
                </div>
              </div>
              <div className="table_body">
                {filteredCoins &&
                  filteredCoins
                    ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((crypto) => {
                      const profit = crypto.price_change_percentage_24h > 0;
                      const saved = isCoinSaved(crypto.id);
                      return (
                        <div className="table_row" key={crypto.id}>
                          <div
                            className="imgId"
                            onClick={() => navigate(`./coins/${crypto.id}`)}
                          >
                            <img
                              src={crypto.image}
                              alt={`${crypto.name} image`}
                            />
                            <div className="coinInfo">
                              <p>{crypto.symbol}</p>
                              <span>{crypto.name}</span>
                            </div>
                          </div>
                          <div className="others_body">
                            <div className="price">
                              <span>
                                {symbol}
                                {numberWithCommasToPrice(
                                  crypto.current_price.toFixed(2)
                                )}
                              </span>
                            </div>
                            <div className="change">
                              <span
                                style={{
                                  display: "flex",
                                  width: "45%",
                                  gap: "5px",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  color: profit ? "rgb(14, 203, 129)" : "red",
                                  fontWeight: "bold",
                                }}
                              >
                                <IoEye
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveToLocalStorage(crypto);
                                  }}
                                  color={saved ? "green" : "white"}
                                  // size={62}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                  }}
                                />
                                {profit && "+"}
                                {crypto.price_change_percentage_24h?.toFixed(2)}
                                %
                              </span>
                            </div>
                            <div className="market">
                              <span>
                                {symbol}
                                {numberWithCommasToPrice(
                                  crypto.market_cap.toString().slice(0, -6)
                                )}
                                M
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <Pagination
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  margin: "0 auto",
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  color: "white",
                  cursor: "pointer",
                }}
                count={Math.ceil(filteredCoins?.length / 10)}
                color="primary"
                onChange={(_, index) => {
                  setPage(index);
                  window.scroll(0, 450);
                }}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TableComponents;
