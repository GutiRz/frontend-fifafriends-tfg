import React from "react";

export const PlayerRow = ({ player }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={`${process.env.REACT_APP_BACKEND}${player.picture}`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              {player.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {player.position}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="text-sm leading-5 text-gray-900">{player.salary}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="text-sm leading-5 text-gray-900">{player.clause}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="text-sm leading-5 text-gray-900">{player.value}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-600">
        <a className="" href={player.transfermarkt}>
          TM
        </a>
        <span className=""> - </span>
        <a className="" href={player.sofifa}>
          Stats
        </a>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a> */}
      </td>
    </tr>
  );
};
