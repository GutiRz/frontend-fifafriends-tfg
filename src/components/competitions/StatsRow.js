import React, { useContext, useState, useEffect } from "react";

export const StatsRow = ({ stat, posicion }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
        {posicion}
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
        <img
          className="w-16 h-16 flex-shrink-0 mx-auto rounded-full"
          src={`${process.env.REACT_APP_BACKEND}${stat.picture}`}
          alt=""
        />
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        {stat.name}
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        {stat.goals}
      </td>
    </tr>
  );
};
