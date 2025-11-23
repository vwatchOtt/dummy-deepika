
import React from "react";
import StatsCard from "./StatsCard";
import BillingChart from "./BillingChart";
import AgingChart from "./AgingChart";
import LatestInvoices from "./LatestInvoices";
import RecentPayments from "./RecentPayments";
import Sidebar from "../Sidebar";
import Header from "../Header";


export default function Dashboard() {
  return (
    <div className="flex">
      {/* <Sidebar /> */}

      <div className="flex-1">
        {/* <Header />  */}

        <div className="p-4 space-y-8">
        
          <StatsCard />

          {/* --- Charts Section --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BillingChart />
            <AgingChart />
          </div>

          {/* --- Tables Section --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LatestInvoices />
            <RecentPayments />
          </div>
        </div>
      </div>
    </div>
  );
}
