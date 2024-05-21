/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useCryptoContext } from "../../context/Context";
import axios from "axios";
import { ChartData } from "../../api/AllApi";
import Loading from "../loader/Loading";

const LineChart = ({ coins }) => {
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useCryptoContext();

  const fetchChartData = async () => {
    try {
      const res = await axios.get(ChartData(coins.id, days, currency));
      const data = await res.data;
      setChartData(data.prices);
    } catch (error) {
      console.log("this is Chart error", error);
    }
  };
  console.log("this is chart data", chartData);

  useEffect(() => {
    fetchChartData();
  }, [days, currency]);

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: `${coins.name} Price Movement`,
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  };

  const series = [
    {
      name: `${coins.name} Price`,
      data: chartData.map((chart) => ({
        x: new Date(chart[0]),
        y: chart[1],
      })),
    },
  ];

  return (
    <div>
      <div style={{ marginTop: "20px", display: "flex", width: "75%" }}>
        {chartData.length === 0 ? (
          <Loading />
        ) : (
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            width={900}
            height={550}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {}
      </div>
    </div>
  );
};

export default LineChart;
