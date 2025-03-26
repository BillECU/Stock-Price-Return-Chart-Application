import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { registerables } from "chart.js";
import { Chart } from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(...registerables, zoomPlugin);
// import * as fs from "fs";
import csvFile from "./data/data.csv";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState("");
  const [chartData, setChartData] = useState(null);
  const [dataType, setDataType] = useState("price");

  useEffect(() => {
    async function fetchData() {
      // const filePath = "src/data/fds_bkln_equs_daily_hist.csv";

      // fs.readFile(filePath, "utf8", (err, data) => {
      //   if (err) {
      //     console.error("Error reading the file:", err);
      //   } else {
      //     Papa.parse(data, {
      //       header: true,
      //       complete: (results) => {
      //         setData(results.data);
      //       },
      //     });
      //   }
      // });
      fetch(csvFile)
        .then((response) => response.text())
        .then((text) => {
          Papa.parse(text, {
            header: true,
            complete: (results) => {
              setData(results.data);
            },
          });
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTicker && data.length > 0) {
      const filteredData = data.filter(
        (item) => item.ticker === selectedTicker
      );
      filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

      const labels = filteredData.map((item) => item.date);
      const values = filteredData.map((item) =>
        dataType === "price" ? parseFloat(item.price) : parseFloat(item.ret)
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: `${selectedTicker} ${
              dataType === "price" ? "Price" : "Return"
            }`,
            data: values,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    } else {
      setChartData(null);
    }
  }, [selectedTicker, data, dataType]);

  const tickers = [
    ...new Set(data.map((item) => item.ticker).filter((ticker) => !!ticker)),
  ];

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  return (
    <div className="app-container">
      <div className="controls-container">
        <h1>Stock Price/Return Chart</h1>
        <select
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
        >
          <option value="">Select a Ticker</option>
          {tickers.map((ticker) => (
            <option key={ticker} value={ticker}>
              {ticker}
            </option>
          ))}
        </select>

        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          className="select-input"
        >
          <option value="price">Price</option>
          <option value="ret">Return</option>
        </select>
      </div>

      {chartData && (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default App;
