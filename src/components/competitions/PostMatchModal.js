import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Transition from "../Transition";
import { MultiSelect } from "../common/MultiSelect";
import axios from "axios";

export const PostMatchModal = ({ show, onClose, match, onUpdate }) => {
  const { user, token } = useContext(AuthContext);

  const [homeTeam, setHomeTeam] = useState({ budget: [], players: [] });
  const [awayTeam, setAwayTeam] = useState({ budget: [], players: [] });

  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);

  const [playersHomeGoals, setPlayersHomeGoals] = useState([]);
  const [playersAwayGoals, setPlayersAwayGoals] = useState([]);
  const [playersHomeAssists, setPlayersHomeAssists] = useState([]);
  const [playersAwayAssists, setPlayersAwayAssists] = useState([]);
  const [playersHomeInjuries, setPlayersHomeInjuries] = useState([]);
  const [playersAwayInjuries, setPlayersAwayInjuries] = useState([]);
  const [playersHomeYellows, setPlayersHomeYellows] = useState([]);
  const [playersAwayYellows, setPlayersAwayYellows] = useState([]);
  const [playersHomeReds, setPlayersHomeReds] = useState([]);
  const [playersAwayReds, setPlayersAwayReds] = useState([]);
  const [playersHomeMvps, setPlayersHomeMvps] = useState([]);
  const [playersAwayMvps, setPlayersAwayMvps] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/teams/${match.local_team.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setHomeTeam(res.data));

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/teams/${match.away_team.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setAwayTeam(res.data));
  }, []);

  //Cálculo de resultado global
  //------------------------
  useEffect(() => {
    setAwayGoals(
      playersAwayGoals.reduce((total, player) => total + player.goals, 0)
    );
  }, [playersAwayGoals]);

  useEffect(() => {
    setHomeGoals(
      playersHomeGoals.reduce((total, player) => total + player.goals, 0)
    );
  }, [playersHomeGoals]);
  //----------------------------------

  const handlePlayersGoals = (type) => (value) => {
    type === "home" ? setPlayersHomeGoals(value) : setPlayersAwayGoals(value);
  };

  const handlePlayersAssists = (type) => (value) => {
    type === "home"
      ? setPlayersHomeAssists(value)
      : setPlayersAwayAssists(value);
  };

  const handlePlayersInjuries = (type) => (value) => {
    type === "home"
      ? setPlayersHomeInjuries(value)
      : setPlayersAwayInjuries(value);
  };

  const handlePlayersYellows = (type) => (value) => {
    type === "home"
      ? setPlayersHomeYellows(value)
      : setPlayersAwayYellows(value);
  };

  const handlePlayersReds = (type) => (value) => {
    type === "home" ? setPlayersHomeReds(value) : setPlayersAwayReds(value);
  };

  const handlePlayersMvps = (type) => (value) => {
    type === "home" ? setPlayersHomeMvps(value) : setPlayersAwayMvps(value);
  };

  //Helper para mergear todos los objetos
  const mergeByProperty = (target, sources, prop) => {
    sources.forEach((source) => {
      source.forEach((sourceElement) => {
        let targetElement = target.find((targetElement) => {
          return sourceElement[prop] === targetElement[prop];
        });
        targetElement
          ? Object.assign(targetElement, sourceElement)
          : target.push(sourceElement);
      });
    });

    return target;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mergedHome = mergeByProperty(
      playersHomeAssists,
      [
        playersHomeGoals,
        playersHomeInjuries,
        playersHomeYellows,
        playersHomeReds,
        playersHomeMvps,
      ],
      "id"
    );
    const mergedAway = mergeByProperty(
      playersAwayAssists,
      [
        playersAwayGoals,
        playersAwayInjuries,
        playersAwayYellows,
        playersAwayReds,
        playersAwayMvps,
      ],
      "id"
    );

    const merged = [...mergedHome, ...mergedAway];
    console.log(merged);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/competitions/post`,
        {
          match: match.id,
          home_goals: homeGoals,
          away_goals: awayGoals,
          stats: merged,
        }
      );
      onUpdate(data);
    } catch (error) {
      console.error(error);
    }

    onClose(false);
  };

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition
            show={show}
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
            show={show}
            enter="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl  sm:w-full sm:p-6"
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
                      Introducir resultado
                    </h3>

                    <div className="mt-10">
                      <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
                        <li>
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              <div>
                                <img
                                  src={match.local_team.shield}
                                  className="w-24 h-24 mb-5 m-auto"
                                />
                                <h1 className="text-5xl text-gray-600">
                                  {homeGoals}
                                </h1>
                              </div>
                              {homeTeam && (
                                <MultiSelect
                                  data={homeTeam.players}
                                  selected={playersHomeGoals}
                                  onSelect={handlePlayersGoals("home")}
                                  stat={"goals"}
                                  results
                                  text={"Goleadores"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-10 md:mt-0">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              <div>
                                <img
                                  src={match.away_team.shield}
                                  className="w-24 h-24 mb-5 m-auto"
                                />
                                <h1 className="text-5xl text-gray-600">
                                  {awayGoals}
                                </h1>
                              </div>

                              {awayTeam && (
                                <MultiSelect
                                  data={awayTeam.players}
                                  selected={playersAwayGoals}
                                  onSelect={handlePlayersGoals("away")}
                                  stat={"goals"}
                                  results
                                  text={"Goleadores"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {homeTeam && (
                                <MultiSelect
                                  data={homeTeam.players}
                                  selected={playersHomeAssists}
                                  onSelect={handlePlayersAssists("home")}
                                  stat={"assists"}
                                  results
                                  text={"Asistentes"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={awayTeam.players}
                                  selected={playersAwayAssists}
                                  onSelect={handlePlayersAssists("away")}
                                  stat={"assists"}
                                  results
                                  text={"Asistentes"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={homeTeam.players}
                                  selected={playersHomeMvps}
                                  onSelect={handlePlayersMvps("home")}
                                  stat={"mvps"}
                                  results
                                  text={"MVP"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={awayTeam.players}
                                  selected={playersAwayMvps}
                                  onSelect={handlePlayersMvps("away")}
                                  stat={"mvps"}
                                  results
                                  text={"MVP"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={homeTeam.players}
                                  selected={playersHomeInjuries}
                                  onSelect={handlePlayersInjuries("home")}
                                  stat={"injuries"}
                                  results
                                  text={"Lesiones"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={awayTeam.players}
                                  selected={playersAwayInjuries}
                                  onSelect={handlePlayersInjuries("away")}
                                  stat={"injuries"}
                                  results
                                  text={"Lesiones"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={homeTeam.players}
                                  selected={playersHomeYellows}
                                  onSelect={handlePlayersYellows("home")}
                                  stat={"yellows"}
                                  results
                                  text={"Tarjetas Amarillas"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={awayTeam.players}
                                  selected={playersAwayYellows}
                                  onSelect={handlePlayersYellows("away")}
                                  stat={"yellows"}
                                  results
                                  text={"Tarjetas amarillas"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={homeTeam.players}
                                  selected={playersHomeReds}
                                  onSelect={handlePlayersReds("home")}
                                  stat={"reds"}
                                  results
                                  text={"Tarjetas rojas"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="mt-1 md:mt-0 ">
                          <div className="flex">
                            <div className="ml-4 w-11/12">
                              {awayTeam && (
                                <MultiSelect
                                  data={awayTeam.players}
                                  selected={playersAwayReds}
                                  onSelect={handlePlayersReds("away")}
                                  stat={"reds"}
                                  results
                                  text={"Tarjetas rojas"}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense pt-10 ">
                  <span className="flex w-full rounded-md shadow-sm sm:col-start-2 justify-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-3/6 rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Enviar resultado
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
