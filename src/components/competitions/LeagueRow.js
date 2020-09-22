import React from "react";

export const LeagueRow = ({ team, position }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap">{position}</td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10" src={team.team.shield} alt="" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.played}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.wins}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.draws}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.defeats}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.goals}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.goals_conceded}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.goals - team.goals_conceded}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-medium text-sm leading-5 rounded-md text-gray-700">
        {team.points}
      </td>
    </tr>
  );
};
