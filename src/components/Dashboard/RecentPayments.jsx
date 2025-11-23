import React from "react";

const payments = [
  { id: 1, payer: "Dr. Mehta", amount: "₹20,000", method: "UPI", date: "2025-10-23" },
  { id: 2, payer: "City Labs", amount: "₹15,000", method: "Bank Transfer", date: "2025-10-22" },
  { id: 3, payer: "ABC Hospital", amount: "₹10,000", method: "Cheque", date: "2025-10-21" },
];

export default function RecentPayments() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Payments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-sm font-medium text-gray-600">Payer</th>
              <th className="p-3 text-sm font-medium text-gray-600">Amount</th>
              <th className="p-3 text-sm font-medium text-gray-600">Method</th>
              <th className="p-3 text-sm font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.payer}</td>
                <td className="p-3">{p.amount}</td>
                <td className="p-3">{p.method}</td>
                <td className="p-3">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
