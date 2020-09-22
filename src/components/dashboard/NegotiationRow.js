import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { StatusLabel } from "../common/StatusLabel";

const NegotiationRow = ({ negotiation, onUpdate, type }) => {
  const { token } = useContext(AuthContext);
  const [myPlayers, setMyPlayers] = useState([]);
  const [theirPlayers, setTheirPlayers] = useState([]);

  useEffect(() => {
    let myPlayers = [];
    let theirPlayers = [];

    negotiation.negotiation_players.map(({ players, team }) => {
      if (team === negotiation.origin_team.id) {
        theirPlayers.push(players.name);
      } else {
        myPlayers.push(players.name);
      }

      if (type === "incoming") {
        setMyPlayers(myPlayers);
        setTheirPlayers(theirPlayers);
      } else {
        setMyPlayers(theirPlayers);
        setTheirPlayers(myPlayers);
      }
    });
  }, []);

  const responseOffer = (type) => async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/auth/negotiations/${type}/${negotiation.id}`,
        {
          negotiation: negotiation.id,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li>
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12"
              src={
                type === "incoming"
                  ? negotiation.origin_team.shield
                  : negotiation.destiny_team.shield
              }
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="text-sm leading-5 font-medium text-red-600 truncate">
                <span>{myPlayers.toString().slice(", ")}</span>
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
                <span className="truncate">
                  {type === "incoming"
                    ? negotiation.money_destiny
                    : negotiation.money_origin}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <div className="text-sm leading-5 font-medium text-green-600 truncate">
                  <span>{theirPlayers.toString().slice(", ")}</span>
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
                  {type === "incoming"
                    ? negotiation.money_origin
                    : negotiation.money_destiny}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm leading-5 font-medium text-orange-600 truncate">
            {negotiation.status === "pending" ? (
              <div>
                <StatusLabel text="Pendiente" color="orange" />
                {type === "incoming" ? (
                  <button
                    className="bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2 rounded-l"
                    onClick={responseOffer("accept")}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </button>
                ) : null}
                <button
                  className="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-1 px-2 rounded-r"
                  onClick={responseOffer("reject")}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : negotiation.status === "rejected" ? (
              <StatusLabel text="Rechazada" color="red" />
            ) : (
              <StatusLabel text="Aceptada" color="green" />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NegotiationRow;
