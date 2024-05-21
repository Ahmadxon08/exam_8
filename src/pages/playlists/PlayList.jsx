import { useEffect, useState } from "react";
import {
  numberWithCommasToPrice,
  useCryptoContext,
} from "../../context/Context";
import "./PlayList.scss";
import { Button } from "@mui/material";

const PlayList = () => {
  const { symbol } = useCryptoContext();

  const { isOpen, handleIsOpen } = useCryptoContext();
  console.log(isOpen);
  const [savedCoins, setSavedCoins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCoins")) || [];
    setSavedCoins(saved);
  }, []);
  const handleDeleteCoin = (coinId) => {
    const updatedCoins = savedCoins.filter((coin) => coin.id !== coinId);
    setSavedCoins(updatedCoins);
    localStorage.setItem("savedCoins", JSON.stringify(updatedCoins));
  };

  return (
    <>
      {isOpen && (
        <div className="Play" onClick={() => handleIsOpen()}>
          <div className="play_content">
            <h1>WATCHLIST</h1>
            <div className="card_content">
              {savedCoins.length === 0 ? (
                <span>WatchList is empty</span>
              ) : (
                savedCoins.map((coin) => (
                  <div className="card" key={coin.id}>
                    <img src={coin.image} alt={`${coin.name} image`} />
                    <span>
                      {" "}
                      {symbol}
                      {numberWithCommasToPrice(coin.current_price.toFixed(2))}
                    </span>
                    <Button
                      onClick={() => handleDeleteCoin(coin.id)}
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "red",
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayList;
