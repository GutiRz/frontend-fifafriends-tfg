import React from "react";

export const PlayerCard = ({ player, onOffer, onClause }) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
      <div className="flex-1 flex flex-col p-8">
        <img
          className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
          src={`${process.env.REACT_APP_BACKEND}${player.picture}`}
          alt=""
        />
        <h3 className="mt-6 text-gray-900 text-sm leading-5 font-medium">
          {player.name}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-500 text-sm leading-5">{player.value}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
              {player.position}
            </span>
            <span className="ml-2 px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
              {player.overall}
            </span>
          </dd>
        </dl>
      </div>
      <div className="border-t border-gray-200">
        <div className="-mt-px flex">
          <div className="w-0 flex-1 flex border-r border-gray-200">
            <button
              onClick={() => onOffer(true)}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="light-bulb w-6 h-6"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
              </svg>
              <span className="ml-3">Oferta</span>
            </button>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              onClick={() => onClause(true, player)}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="lightning-bolt w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3">Cláusula</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
