import React, { useContext } from "react";
import { StatusLabel } from "../common/StatusLabel";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "moment-duration-format";
import axios from "axios";

export const ClausesRow = ({ clause, onUpdate }) => {
  const { user, token } = useContext(AuthContext);

  const millisecondsToClause = moment
    .utc(moment(clause[0].launchable_at, "YYYY-MM-DD HH:mm:ss"))
    .diff(
      moment.utc(moment(clause[0].now.date), "YYYY-MM-DD HH:mm:ss"),
      "milliseconds"
    );

  function imParticipantLaunchable(array, team) {
    let result = false;

    for (var i = 0; i < array.length; i++) {
      if (array[i].destiny_team.id === team && array[i].is_launchable) {
        result = true;
        break;
      }
    }
    return result;
  }

  function myPosition(array, team) {
    let clauseId = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i].destiny_team.id === team) {
        clauseId = array[i].id;
        break;
      }
    }
    return clauseId;
  }

  const launchDice = (clause, teamId) => async (e) => {
    e.preventDefault();

    const idClause = myPosition(clause, teamId);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/clauses/launch/${idClause}`,
        {
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

  const acceptClause = (clause) => async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/auth/clauses/accept/${clause}`,
        {
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

  const rejectClause = (clause) => async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/auth/clauses/reject/${clause}`,
        {
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
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full "
              src={`${clause[0].origin_team.shield}`}
              alt=""
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {clause[0].player.name}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {clause[0].player.position}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {clause[0].player.clause}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {millisecondsToClause > 0
          ? moment
              .utc(moment(clause[0].launchable_at, "YYYY-MM-DD HH:mm:ss"))
              .to(
                moment.utc(moment(clause[0].now.date), "YYYY-MM-DD HH:mm:ss"),
                "milliseconds"
              )
          : clause[0].dice !== null
          ? clause[0].dice
          : "DADOS"}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {clause.map((c) => (
          <img
            className={`h-10 w-10 inline ${
              moment
                .utc(moment(c.launchable_at, "YYYY-MM-DD HH:mm:ss"))
                .diff(
                  moment.utc(moment(c.now.date), "YYYY-MM-DD HH:mm:ss"),
                  "milliseconds"
                ) < 0 && c.is_launchable
                ? ""
                : "opacity-50"
            }`}
            src={`${c.destiny_team.shield}`}
            alt=""
            key={c.destiny_team.id}
          />
        ))}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
        {user &&
        clause.find((c) => c.is_launchable) &&
        clause.find((c) => c.is_launchable).state === "open" ? (
          moment
            .utc(
              moment(
                clause.find((c) => c.is_launchable).launchable_at,
                "YYYY-MM-DD HH:mm:ss"
              )
            )
            .diff(
              moment.utc(
                moment(clause.find((c) => c.is_launchable).now.date),
                "YYYY-MM-DD HH:mm:ss"
              ),
              "milliseconds"
            ) < 0 && imParticipantLaunchable(clause, user.team.id) ? (
            <button
              onClick={launchDice(clause, user.team.id)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span>Dados</span>
            </button>
          ) : (
            <StatusLabel text="Abierta" color="blue" />
          )
        ) : clause.find((c) => c.is_launchable) &&
          clause.find((c) => c.is_launchable).state === "pending" ? (
          user &&
          user.team.id ===
            clause.find((c) => c.is_launchable).destiny_team.id ? (
            <div>
              <button
                className="bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2 rounded-l"
                onClick={acceptClause(clause.find((c) => c.is_launchable).id)}
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
              <button
                className="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-1 px-2 rounded-r"
                onClick={rejectClause(clause.find((c) => c.is_launchable).id)}
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
          ) : (
            <StatusLabel text="Pendiente" color="orange" />
          )
        ) : clause.find((c) => c.is_launchable) &&
          clause.find((c) => c.is_launchable).state === "accepted" ? (
          <StatusLabel text="Aceptada" color="green" />
        ) : (
          <StatusLabel text="Rechazada" color="red" />
        )}
      </td>
    </tr>
  );
};
