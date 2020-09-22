import React, { useContext, useState, useEffect } from "react";
import { StatusLabel } from "../common/StatusLabel";
import { AuthContext } from "../../context/AuthContext";

export const NegotiationsRow = ({ negotiation }) => {
  const { user, token } = useContext(AuthContext);

  const [originPlayers, setOriginPlayers] = useState([]);
  const [destinyPlayers, setDestinyPlayers] = useState([]);

  useEffect(() => {
    let originNegotiationPlayers = [];
    let destinyNegotiationPlayers = [];

    negotiation.negotiation_players.map(({ players, team }) => {
      if (team === negotiation.origin_team.id) {
        originNegotiationPlayers.push(players.name);
      } else {
        destinyNegotiationPlayers.push(players.name);
      }

      setOriginPlayers(originNegotiationPlayers);
      setDestinyPlayers(destinyNegotiationPlayers);
    });
  }, []);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 "
              src={`${negotiation.origin_team.shield}`}
              alt=""
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        <div className="text-sm leading-5 font-medium text-gray-600 truncate">
          <span>{originPlayers.toString().slice(", ")}</span>
        </div>
        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="transform transition-transform duration-500 ease-in-out"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="truncate">{negotiation.money_origin}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 "
              src={`${negotiation.destiny_team.shield}`}
              alt=""
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        <div className="text-sm leading-5 font-medium text-gray-900 truncate">
          <span>{destinyPlayers.toString().slice(", ")}</span>
        </div>
        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="transform transition-transform duration-500 ease-in-out"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="truncate">{negotiation.money_destiny}</span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
        {negotiation.status === "pending" ? (
          <StatusLabel text="Pendiente" color="orange" />
        ) : negotiation.status === "rejected" ? (
          <StatusLabel text="Rechazada" color="red" />
        ) : (
          <StatusLabel text="Aceptada" color="green" />
        )}
      </td>
    </tr>
  );
};
