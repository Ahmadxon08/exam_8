/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import {
  numberWithCommasToPrice,
  useCryptoContext,
} from "../../context/Context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../api/AllApi";
import LineChart from "../../components/chart/LineChart";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LinearProgress, Typography } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  paddingLeft: 20,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  marginTop: 25,
  borderRight: "2px solid grey",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "auto",
    borderRight: "none",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
    marginTop: 25,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
  },
}));
const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: "white",
  marginBottom: 15,
  marginTop: 15,
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
}));
const Span = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "Montserrat",
  color: "white",
  marginBottom: 15,
  marginTop: 15,
  textAlign: "center",
  marginRight: 10,
  letterSpacing: "1px",
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
}));
const Market = styled(Typography)(({ theme }) => ({
  alignItems: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "start",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const View = () => {
  const { id } = useParams();
  const [coins, setCoins] = useState(null);
  const { currency, symbol , setUpdate } = useCryptoContext();

  const fetchSingleCoinsList = async () => {
    try {
      if (!id) return;
      const res = await axios.get(SingleCoin(id));
      setCoins(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSingleCoinsList();
  }, [id]);

  useEffect(() => {
    if (coins) {
      const dataCoin = JSON.parse(localStorage.getItem("savedCoins")) || [];
      const updatedData = dataCoin.filter((item) => item.id !== coins.id);
      updatedData.push(coins);
      localStorage.setItem("savedCoins", JSON.stringify(updatedData));
      setUpdate(updatedData)
    }
  }, [id , coins]);

  if (!coins) {
    return (
      <LinearProgress
        style={{
          backgroundColor: "87ceeb",
        }}
      />
    );
  }

  return (
    <Container>
      <Sidebar>
        {coins && (
          <>
            <img
              src={coins?.image.large}
              alt={coins?.name}
              height={200}
              style={{ marginBottom: 25 }}
            />
            <Heading>{coins?.name}</Heading>
            <Span>{coins?.description.en.split(".")[0]}</Span>
            <Market>
              <span
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                  }}
                >
                  RANK:
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  {coins?.market_cap_rank}
                </Typography>
              </span>
              <span
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                >
                  {" "}
                  Current Price:
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  {symbol}
                  {numberWithCommasToPrice(
                    coins?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                >
                  Market Cap:
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  {symbol}
                  {numberWithCommasToPrice(
                    coins?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, 6)
                  )}
                  M
                </Typography>
              </span>
            </Market>
          </>
        )}
      </Sidebar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LineChart coins={coins} />
      </div>
    </Container>
  );
};

export default View;
