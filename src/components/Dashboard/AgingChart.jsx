import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { range: "0-30 Days", invoices: 10 },
  { range: "31-60 Days", invoices: 8 },
  { range: "61-90 Days", invoices: 5 },
  { range: "90+ Days", invoices: 3 },
];

export default function AgingChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-#6B7280">Invoice Aging</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="invoices" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
