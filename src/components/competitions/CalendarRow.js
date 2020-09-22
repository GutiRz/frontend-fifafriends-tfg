import React, { useState, useContext } from "react";
import { PostMatchModal } from "./PostMatchModal";
import { AuthContext } from "../../context/AuthContext";

export const CalendarRow = ({ match, onUpdate }) => {
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  function handleShowModal(newValue) {
    setShowModal(newValue);
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    <div className="flex justify-center items-center">
                      <div className="flex items-center justify-end w-48 text-sm leading-5 font-medium text-gray-600 truncate">
                        <span>{match.local_team.name}</span>
                        <img
                          className="h-8 w-8 ml-4"
                          src={match.local_team.shield}
                          alt=""
                        />
                      </div>

                      {match.status === "open" ? (
                        <div className="flex  flex-shrink-0 items-center justify-center w-48 rounded-md">
                          <span className="border-gray-200 border-2 p-2">
                            No jug.
                          </span>
                        </div>
                      ) : (
                        <div className="flex  flex-shrink-0 items-center justify-center w-48 rounded-md">
                          <span className="border-gray-200 border-2 p-2">
                            {match.local_goals} - {match.away_goals}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-start  text-right w-48 text-sm leading-5 font-medium text-gray-600 truncate">
                        <img
                          className="h-8 w-8 rounded-full mr-4"
                          src={match.away_team.shield}
                          alt=""
                        />
                        <span className="">{match.away_team.name}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    {user &&
                    (user.team.id === match.local_team.id ||
                      user.team.id === match.away_team.id) &&
                    match.status === "open" ? (
                      <button
                        onClick={() => handleShowModal(true)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Postear
                      </button>
                    ) : (
                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"></td>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {showModal && (
          <PostMatchModal
            show={showModal}
            onClose={handleShowModal}
            match={match}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  );
};
