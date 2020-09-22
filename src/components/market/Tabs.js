import React, { useState } from "react";
import { ClausesMarket } from "./ClausesMarket";
import { NegotiationsMarket } from "./NegotiationsMarket";

export const Tabs = () => {
  const [tabSelected, setTabSelected] = useState("Claúsulas");
  const [openSelect, setOpenSelect] = useState(false);

  const handleTabs = (value) => {
    setTabSelected(value);
  };

  const renderComponentSelected = () => {
    let component;
    switch (tabSelected) {
      case "Claúsulas":
        component = <ClausesMarket />;
        break;
      case "Negociaciones":
        component = <NegotiationsMarket />;
        break;
      /* case "Ofertas":
        component = <div>Offers component</div>;
        break;
      case "Transferibles":
        component = <div>Transfer players component</div>;
        break; */
      default:
        break;
    }
    return component;
  };

  return (
    <>
      <div>
        <div className="sm:hidden">
          <div className="space-y-1">
            {/* <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
              Assigned to
  </label> */}
            <div
              className="relative"
              onClick={() => setOpenSelect(!openSelect)}
            >
              <span className="inline-block w-full rounded-md shadow-sm">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded="true"
                  aria-labelledby="listbox-label"
                  className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  <span className="block truncate">{tabSelected}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </span>

              {openSelect && (
                <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                  <ul
                    tabIndex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                  >
                    <li
                      onClick={() => handleTabs("Claúsulas")}
                      role="option"
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
                    >
                      <span
                        className={`${
                          tabSelected === "Claúsulas"
                            ? "font-semibold"
                            : "font-normal"
                        } block truncate`}
                      >
                        Cláusulas
                      </span>
                      {tabSelected === "Claúsulas" && (
                        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </li>

                    <li
                      onClick={() => handleTabs("Negociaciones")}
                      role="option"
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
                    >
                      <span
                        className={`${
                          tabSelected === "Negociaciones"
                            ? "font-semibold"
                            : "font-normal"
                        } block truncate`}
                      >
                        Negociaciones
                      </span>
                      {tabSelected === "Negociaciones" && (
                        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </li>

                    {/* <li
                      onClick={() => handleTabs("Ofertas")}
                      role="option"
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
                    >
                      <span
                        className={`${
                          tabSelected === "Ofertas"
                            ? "font-semibold"
                            : "font-normal"
                        } block truncate`}
                      >
                        Ofertas
                      </span>
                      {tabSelected === "Ofertas" && (
                        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </li>

                    <li
                      onClick={() => handleTabs("Transferibles")}
                      role="option"
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
                    >
                      <span
                        className={`${
                          tabSelected === "Transferibles"
                            ? "font-semibold"
                            : "font-normal"
                        } block truncate`}
                      >
                        Transferibles
                      </span>
                      {tabSelected === "Transferibles" && (
                        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </li> */}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <nav className="flex">
            <button
              onClick={() => handleTabs("Claúsulas")}
              className={`${
                tabSelected === "Claúsulas"
                  ? "text-indigo-700 bg-indigo-100"
                  : "text-gray-500 hover:text-gray-700"
              } focus:outline-none px-3 py-2 font-medium text-sm leading-5 rounded-md`}
            >
              Claúsulas
            </button>
            <button
              onClick={() => handleTabs("Negociaciones")}
              className={`${
                tabSelected === "Negociaciones"
                  ? "text-indigo-700 bg-indigo-100"
                  : "text-gray-500 hover:text-gray-700"
              } focus:outline-none px-3 py-2 font-medium text-sm leading-5 rounded-md`}
            >
              Negociaciones
            </button>
            {/* <button
              onClick={() => handleTabs("Ofertas")}
              className={`${
                tabSelected === "Ofertas"
                  ? "text-indigo-700 bg-indigo-100"
                  : "text-gray-500 hover:text-gray-700"
              } focus:outline-none px-3 py-2 font-medium text-sm leading-5 rounded-md`}
            >
              Ofertas
            </button>
            <button
              onClick={() => handleTabs("Transferibles")}
              className={`${
                tabSelected === "Transferibles"
                  ? "text-indigo-700 bg-indigo-100"
                  : "text-gray-500 hover:text-gray-700"
              } focus:outline-none px-3 py-2 font-medium text-sm leading-5 rounded-md`}
            >
              Transferibles
            </button> */}
          </nav>
        </div>
      </div>
      <div className="mt-4">{renderComponentSelected()}</div>
    </>
  );
};
