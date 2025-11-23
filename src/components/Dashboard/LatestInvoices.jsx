import React from "react";

const invoices = [
  { id: "INV-001", client: "ABC Hospital", date: "2025-10-22", amount: "₹45,000", status: "Paid" },
  { id: "INV-002", client: "City Labs", date: "2025-10-21", amount: "₹30,000", status: "Pending" },
  { id: "INV-003", client: "HealthCare Ltd", date: "2025-10-20", amount: "₹25,000", status: "Paid" },
];

export default function LatestInvoices() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Invoices</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-sm font-medium text-gray-600">Invoice ID</th>
              <th className="p-3 text-sm font-medium text-gray-600">Client</th>
              <th className="p-3 text-sm font-medium text-gray-600">Date</th>
              <th className="p-3 text-sm font-medium text-gray-600">Amount</th>
              <th className="p-3 text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{inv.id}</td>
                <td className="p-3">{inv.client}</td>
                <td className="p-3">{inv.date}</td>
                <td className="p-3">{inv.amount}</td>
                <td className={`p-3 font-medium ${inv.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                  {inv.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
