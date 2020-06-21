import React, { useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";

const weekdays = moment.weekdaysShort();

const valueName = "Бонусы";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Chart = ({ tasks = [] }) => {
  const [windowWidth] = useWindowSize();

  const data = weekdays.map((dayName) => {
    const dayTasks = tasks.filter(
      (task) => moment(task.finishDate).format("ddd") === dayName
    );

    const sum = dayTasks.reduce((sum, el) => sum + el.earnedBonuce, 0);

    return {
      dayName,
      [valueName]: sum,
    };
  });

  let width = 0;
  if (windowWidth < 920) {
    width = 400;
  }
  if (windowWidth > 920) {
    width = 800;
  }
  if (windowWidth < 360) {
    width = 230;
  }

  return (
    <LineChart height={300} width={width} data={data}>
      <Line
        type="monotone"
        dataKey={valueName}
        stroke="#8884d8"
        animationDuration={1200}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="dayName" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
