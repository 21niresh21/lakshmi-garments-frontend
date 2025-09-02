import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getSupplierDelayData } from "../../../api/analyticsApi";
import { parseISO } from "../../../utils/dateUtils";

// Helper to calculate boxplot stats (min, Q1, median, Q3, max)
function boxPlotData(arr) {
  arr.sort((a, b) => a - b);
  const q1 = arr[Math.floor((arr.length / 4))];
  const median = arr[Math.floor((arr.length / 2))];
  const q3 = arr[Math.floor((arr.length * 3) / 4)];
  const min = arr[0];
  const max = arr[arr.length - 1];
  return [min, q1, median, q3, max];
}

const SupplierDelayBoxPlot = () => {
  const [option, setOption] = useState(null);

  useEffect(() => {
    getSupplierDelayData()
      .then((data) => {
        // Group delays by supplier
        const grouped = data.reduce((acc, cur) => {
          if (!acc[cur.supplier_name]) acc[cur.supplier_name] = [];
          acc[cur.supplier_name].push(cur.delay_days);
          return acc;
        }, {});

        const suppliers = Object.keys(grouped);

        // Calculate boxplot data per supplier
        const boxData = suppliers.map((supplier) =>
          boxPlotData(grouped[supplier])
        );

        // Flatten all points for scatter overlay (show all delays)
        const allPoints = [];
        suppliers.forEach((supplier, i) => {
          grouped[supplier].forEach((delay) => {
            allPoints.push([i, delay]);
          });
        });

        setOption({
          title: {
            text: "Supplier Delay in Days",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: suppliers,
            boundaryGap: true,
            name: "Suppliers",
            nameLocation: "middle",
            nameGap: 30,
            splitArea: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            name: "Delay (days)",
            nameLocation: "middle",
            nameGap: 30,
            splitArea: {
              show: true,
            },
          },
          series: [
            {
              name: "Boxplot",
              type: "boxplot",
              data: boxData,
              tooltip: {
                formatter: function (param) {
                  return [
                    `${suppliers[param.dataIndex]} Delay Days`,
                    `Min: ${param.data[0]}`,
                    `Q1: ${param.data[1]}`,
                    `Median: ${param.data[2]}`,
                    `Q3: ${param.data[3]}`,
                    `Max: ${param.data[4]}`,
                  ].join("<br/>");
                },
              },
            },
            {
              name: "Outliers",
              type: "scatter",
              data: allPoints,
              tooltip: {
                formatter: function (param) {
                  return `${suppliers[param.data[0]]}: Delay ${param.data[1]} days`;
                },
              },
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Error loading supplier delay data:", err);
      });
  }, []);

  return option ? (
    <ReactECharts  option={option} style={{ height: 400, width: "100%" }} />
  ) : (
    <div>Loading chart...</div>
  );
};

export default SupplierDelayBoxPlot;
