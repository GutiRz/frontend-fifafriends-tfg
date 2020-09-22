import React from "react";
import { StatsRow } from "./StatsRow";

export const StatsTable = ({ stat, name }) => {
  return (
    <div className="flex flex-col mt-12 content-center">
      <div className="-my-2 .w-3/5 sm:-mx-6 lg:-mx-8 text-center ">
        <div className="py-2 align-middle inline-block .w-3/5 sm:px-6 lg:px-8 ">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
            <table className=".w-3/5 divide-y divide-gray-200 ">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    POS
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Jugador
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {name}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stat &&
                  stat.map((s, index) => (
                    <StatsRow stat={s} key={s.id} posicion={index + 1} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
