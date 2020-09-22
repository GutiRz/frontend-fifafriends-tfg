import React, { useContext } from "react";
import Transition from "../Transition";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export const ClauseModal = ({ showModalClause, onClose, playerClause }) => {
  const { user, token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(playerClause);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/clauses`, {
        player: playerClause.id,
        destiny_team: user.team.id,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
            show={showModalClause}
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
            show={showModalClause}
            enter="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl  sm:w-full sm:p-6"
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
                      Confirmación
                    </h3>
                  </div>
                  <div className="mt-5 text-center">
                    ¿Está seguro de que desea pagar la cláusula de
                    <strong>{" " + playerClause.name}</strong>?
                  </div>
                  {playerClause.salary < 15000000 ? (
                    <>
                      <div className="mt-2 text-center sm:mt-2"></div>
                      <div className="mt-2 text-center sm:mt-2">
                        Se le descontará un depósito de{" "}
                        {playerClause.clause * 0.3}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense pt-10 ">
                  <span className="flex w-full rounded-md shadow-sm sm:col-start-2 justify-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-3/6 rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Confirmar cláusula
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
