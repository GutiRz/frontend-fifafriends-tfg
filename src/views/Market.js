import React from "react";
import { Shell } from "../components/Shell";
import { Tabs } from "../components/market/Tabs";
export const MarketPage = () => {
  return (
    <Shell>
      <div className="mt-8">
        <Tabs />
      </div>
    </Shell>
  );
};
