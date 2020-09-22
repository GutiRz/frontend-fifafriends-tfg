import React from "react";

const DashboardHeader = ({ team }) => {
  return (
    <header className="lg:flex lg:items-center lg:justify-between bg-gray-800 py-6 mb-4">
      <img src={team.shield} className="w-24 h-24  mx-4" />
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate m-4">
          {team.name}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-300 sm:mr-6">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="user-group w-6 h-6"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="ml-2">{team.players.length} jugadores</span>
          </div>
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-300 sm:mr-6">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="currency-euro w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">
              {parseFloat(team.budget / 1000000)} millones
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
