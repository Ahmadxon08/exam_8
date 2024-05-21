/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import {
  numberWithCommasToPrice,
  useCryptoContext,
} from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box } from "@mui/material"; // Material-UI Box komponenti stil uchun ishlatiladi

const Carousel = () => {
  const { trending, symbol } = useCryptoContext();

  console.log(trending);

  const items = trending.map((item) => {
    const profit = item.price_change_percentage_24h >= 0;
    return (
      <Link
        to={`./coins/${item.id}`}
        key={item.id}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
            width: "100px",
            height: "100px",
            margin: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "Roboto",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "10px",
            }}
          >
            {item.symbol}
          </h3>

          <span
            style={{
              color: profit > 0 ? `  #0ECB81` : "red",
              fontWeight: "bold",
            }}
          >
            {profit && "+"} {item?.price_change_percentage_24h?.toFixed(2)} %{" "}
          </span>
        </div>
        <p
          style={{
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "Roboto",
            color: "white",
            position: "relative",
            top: "-25px",
          }}
        >
          {symbol} {numberWithCommasToPrice(item?.current_price.toFixed(2))}
        </p>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </Box>
  );
};

export default Carousel;
