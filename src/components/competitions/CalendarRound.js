import React from "react";
import { CalendarRow } from "./CalendarRow";

export const CalendarRound = ({ round, onUpdate }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 leading-tight mt-5 mb-3">
        Jornada {round[0].round}
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-3">
        <ul>
          {round &&
            round.map((match) => (
              <CalendarRow match={match} key={match.id} onUpdate={onUpdate} />
            ))}
        </ul>
      </div>
    </div>
  );
};
