import { Chart } from "react-google-charts";
export const data = [
  ["Task", "Hours per Day"],
  ["Work", 8],
  ["Eat", 3],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};

const chartOptions = {
  colors: ["#b00", "#666"], // specify colors here
};

const MyChart = () => (
  <Chart
    chartType="PieChart"
    data={data}
    options={options}
    width={"100%"}
    height={"400px"}
    chartOptions={chartOptions}
  />
);
export default MyChart;
