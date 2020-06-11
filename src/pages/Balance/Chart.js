import React from "react";
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

const Chart = ({ tasks = [] }) => {
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

  return (
    <LineChart width={800} height={300} data={data}>
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
