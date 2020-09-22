import React, { useState } from "react";

export const MultiSelect = ({
  data,
  onSelect,
  selected,
  results,
  stat,
  text,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelected = (elem) => {
    if (selected.find((el) => el === elem)) {
      onSelect(selected.filter((el) => el !== elem));
    } else {
      onSelect([...selected, elem]);
    }
  };

  const handleObjectPlayerSelected = (elem) => {
    if (selected.find((el) => el.id === elem.id)) {
      onSelect(selected.filter((el) => el.id !== elem.id));
    } else {
      onSelect([
        ...selected,
        {
          id: elem.id,
          name: elem.name,
          [stat]: 1,
          picture: elem.picture,
        },
      ]);
    }
  };

  const handleStats = (stat) => (type) => (elem) => (e) => {
    console.log(elem);
    e.preventDefault();
    e.stopPropagation();
    let player = selected.find((el) => el.id === elem.id);
    player = {
      ...player,
      [stat]: type === "+" ? player[stat] + 1 : player[stat] - 1,
    };
    player[stat] > 0
      ? onSelect(
          [...selected.filter((el) => el.id !== elem.id), player].sort(
            (a, b) => a.id - b.id
          )
        )
      : onSelect(
          [...selected.filter((el) => el.id !== elem.id)].sort(
            (a, b) => a.id - b.id
          )
        );
  };

  return (
    <div className="space-y-1 pl-3 pr-3">
      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            onClick={() => setOpen(!open)}
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <div className="flex items-center space-x-3">
              {selected && selected.length
                ? selected.map((s) => (
                    <div key={s.id}>
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                        {results && (
                          <button
                            onClick={(e) => handleStats(stat)("-")(s)(e)}
                            className=" p-1 mr-2 "
                          >
                            -
                          </button>
                        )}

                        <span class="inline-block relative mx-2">
                          <img
                            class="h-10 w-10 rounded-full"
                            src={`${process.env.REACT_APP_BACKEND}${s.picture}`}
                            alt=""
                          />
                          {results && (
                            <span class="inline-flex items-center justify-center text-xs absolute bottom-0 right-0 block h-4 w-4 rounded-full shadow-solid bg-white">
                              {s[stat]}
                            </span>
                          )}
                        </span>
                        {results && (
                          <button onClick={(e) => handleStats(stat)("+")(s)(e)}>
                            +
                          </button>
                        )}
                        <button
                          onClick={() =>
                            results
                              ? handleObjectPlayerSelected(s)
                              : handleSelected(s)
                          }
                          type="button"
                          className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700 ml-2"
                          aria-label="Remove large badge"
                        >
                          <svg
                            className="h-2 w-2"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 8 8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="M1 1l6 6m0-6L1 7"
                            />
                          </svg>
                        </button>
                      </span>

                      {/* <span className="block truncate">
                    {s.name}
                  </span> */}
                    </div>
                  ))
                : `${text || "Selecciona jugador"}`}
            </div>
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

        {open && (
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 overflow-auto z-30 inset-auto">
            <ul
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
            >
              {data &&
                data.map((d) => (
                  <li
                    onClick={() =>
                      results
                        ? handleObjectPlayerSelected(d)
                        : handleSelected(d)
                    }
                    key={d.id}
                    role="option"
                    className={`text-gray-900 hover:text-white hover:bg-indigo-600 cursor-default select-none relative py-2 pl-3 pr-9 `}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={`${process.env.REACT_APP_BACKEND}${d.picture}`}
                        alt=""
                        className="flex-shrink-0 h-6 w-6 rounded-full"
                      />

                      <span
                        className={`${
                          selected.includes(d.id)
                            ? "font-semibold"
                            : "font-normal"
                        } block truncate`}
                      >
                        {d.name}
                      </span>
                    </div>

                    {selected.includes(d.id) && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 hover:bg-indigo-600 hover:text-white">
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
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
