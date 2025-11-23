

import React from "react";
import {
  DollarSign,
  FileText,
  CircleAlert,
  NotepadText,
} from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Total Invoices",
    value: "248",
    icon: <FileText className="text-white w-6 h-6" />,
    iconBg: "bg-gradient-to-r from-[#2563EB] to-[#7FA7FF]",
    change: "+12%",
  },
  {
    id: 2,
    title: "Total Payments Received",
    value: "$487,350",
    icon: <DollarSign className="text-white w-6 h-6" />,
    iconBg: "bg-gradient-to-r from-[#14B8A6] to-[#0D9488]",
    change: "+8%",
  },
  {
    id: 3,
    title: "Pending AR",
    value: "$142,800",
    icon: <CircleAlert className="text-white w-6 h-6" />,
    iconBg: "bg-gradient-to-r from-[#FB923C] to-[#F97316]",
    change: "-5%",
  },
  {
    id: 4,
    title: "Active Studies",
    value: "34",
    icon: <NotepadText className="text-white w-6 h-6" />,
    iconBg: "bg-gradient-to-r from-[#60A5FA] to-[#3B82F6]",
    change: "+3%",
  },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 ">
      {cards.map((card) => (
        <div 
          key={card.id}
          className="relative bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300"
        >
          {/* Top-right percentage */}
          <span
            className={`absolute top-3 right-4 text-sm font-semibold ${
              card.change.includes("+") ? "text-green-600" : "text-red-500"
            }`}
          >
            {card.change}
          </span>

          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center ${card.iconBg} p-3 rounded-md mb-4 w-12 h-12`}
          >
            {card.icon}
          </div>

          {/* Title & Value */}
          <div>
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-1">
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
