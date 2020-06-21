import React, { useState } from "react";
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

  let width = 0;

  if (window.innerWidth < 920) {
    width = 400;
  }
  if (window.innerWidth > 920) {
    width = 800;
  }
  if (window.innerWidth < 360) {
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
