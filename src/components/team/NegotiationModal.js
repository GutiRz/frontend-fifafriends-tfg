import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Transition from "../Transition";
import { MultiSelect } from "../common/MultiSelect";
import axios from "axios";

export const NegotiationModal = ({ showModal, onClose }) => {
  const { user, token } = useContext(AuthContext);

  const [myTeam, setMyTeam] = useState({ budget: [], players: [] });
  const [otherTeam, setOtherTeam] = useState({ budget: [], players: [] });

  const [moneyOrigin, setMoneyOrigin] = useState(0);
  const [moneyDestiny, setMoneyDestiny] = useState(0);
  const [playersOrigin, setPlayersOrigin] = useState([]);
  const [playersDestiny, setPlayersDestiny] = useState([]);

  const params = useParams();

  const handlePlayers = (type) => (value) => {
    type === "origin" ? setPlayersOrigin(value) : setPlayersDestiny(value);
  };
  // MI DINERO - myTeam.budget
  // MIS JUGADORES - myTeam.players

  // SU DINERO - otherTeam.budget
  // SUS JUGADORES - otherTeam.players

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/teams/${params.team}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOtherTeam(res.data));

    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/teams/${user.team.slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMyTeam(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const negotiationPlayers = [
      ...playersOrigin.map((p) => p.id),
      ...playersDestiny.map((p) => p.id),
    ];

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/negotiations`,
        {
          origin_team: myTeam.id,
          destiny_team: otherTeam.id,
          money_origin: moneyOrigin,
          money_destiny: moneyDestiny,
          players: negotiationPlayers,
        }
      );
    } catch (error) {
      console.error(error);
    }

    onClose(false);
  };

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto h-screen">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition
            show={showModal}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </Transition>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <Transition
            show={showModal}
            enter="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className=" inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl  sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form
                action="#"
                method="#"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <div className="mt-2 text-center sm:mt-2">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Negociación en proceso
                    </h3>

                    <div className="mt-10">
                      <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
                        <li>
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg leading-6 font-medium text-gray-900">
                                Disponible: {myTeam.budget}
                              </h4>
                              <input
                                value={moneyOrigin}
                                onChange={(e) => setMoneyOrigin(e.target.value)}
                                id="money_origin"
                                type="number"
                                step="1000000"
                                min="0"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="mt-10 md:mt-0">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg leading-6 font-medium text-gray-900">
                                Disponible: {otherTeam.budget}
                              </h4>
                              <input
                                value={moneyDestiny}
                                onChange={(e) =>
                                  setMoneyDestiny(e.target.value)
                                }
                                id="money_destiny"
                                type="number"
                                step="1000000"
                                min="0"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              />
                            </div>
                          </div>
                        </li>
                        <li className="mt-10 md:mt-0 pt-10">
                          <div className="flex">
                            <div className="flex-shrink-0 self-end">
                              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4 w-3/4">
                              <h4 className="text-lg leading-6 font-medium text-gray-900">
                                Mis jugadores
                              </h4>
                              <MultiSelect
                                data={myTeam.players}
                                selected={playersOrigin}
                                onSelect={handlePlayers("origin")}
                              />
                              {/* <MultiSelect
                                data={myTeam.players} -> No tocar
                                selected={playersOriginGoals} -> Un state para cada stat
                                onSelect={handlePlayers("origin")} -> No tocar
                                stat={"goals"} -> El atributo a añadir en el objeto
                                results
                              /> */}
                            </div>
                          </div>
                        </li>
                        <li className="mt-10 md:mt-0 pt-10">
                          <div className="flex">
                            <div className="flex-shrink-0 self-end">
                              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4 w-3/4">
                              <h4 className="text-lg leading-6 font-medium text-gray-900">
                                -
                              </h4>
                              <MultiSelect
                                data={otherTeam.players}
                                selected={playersDestiny}
                                onSelect={handlePlayers("destiny")}
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-2"></div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense pt-10 ">
                  <span className="flex w-full rounded-md shadow-sm sm:col-start-2 justify-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-3/6 rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Enviar oferta
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1 justify-center">
                    <button
                      onClick={() => onClose(false)}
                      type="button"
                      className="inline-flex justify-center w-3/6 rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancelar
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
