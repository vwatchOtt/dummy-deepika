import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", amount: 40000 },
  { month: "Feb", amount: 35000 },
  { month: "Mar", amount: 60000 },
  { month: "Apr", amount: 72000 },
  { month: "May", amount: 81000 },
  { month: "Jun", amount: 95000 },
];

export default function BillingChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Billing</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563EB" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
