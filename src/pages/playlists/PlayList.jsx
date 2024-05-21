import { useEffect, useState } from "react";
import {
  numberWithCommasToPrice,
  useCryptoContext,
} from "../../context/Context";
import "./PlayList.scss";
import { Alert, Button, Snackbar } from "@mui/material";

const PlayList = () => {
  const [remove, setRemove] = useState(false);

  const { symbol , update , setUpdate , isOpen, handleIsOpen } = useCryptoContext();

  console.log(isOpen);
  const [savedCoins, setSavedCoins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCoins")) || [];
    setSavedCoins(saved);
  }, [update]);

  const handleDeleteCoin = (coinId) => {
    const updatedCoins = savedCoins.filter((coin) => coin.id !== coinId);
    setSavedCoins(updatedCoins);
    setRemove(true);
    localStorage.setItem("savedCoins", JSON.stringify(updatedCoins));
    setUpdate(updatedCoins)
  };

  return (
    <>
      {isOpen && (
        <div className="Play" onClick={() => handleIsOpen()}>
          <div className="play_content" onClick={(e) =>  e.stopPropagation()}>
            <h1>WATCHLIST</h1>
            <div className="card_content">
              {savedCoins.length === 0 ? (
                <span>WatchList is empty</span>
              ) : (
                savedCoins.map((coin) => (
                  <div className="card" key={coin.id}>
                    <Snackbar
                      open={remove}
                      autoHideDuration={1000}
                      onClose={() => setRemove(false)}
                    >
                      <Alert
                        onClose={() => setRemove(false)}  
                        // severity="seccess"
                        variant="filled"
                        sx={{ width: "100%" }}
                        style={{
                          backgroundColor: "red",
                        }}
                      >
                        Coin is removed succesfullyfrom Watchlist!
                      </Alert>
                    </Snackbar>
                    <img src={coin.image?.large} alt={`${coin.name} image`} />
                    <span>
                      {" "}
                      {symbol}
                      {numberWithCommasToPrice(coin.market_data?.current_price?.usd.toFixed(2))}
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
