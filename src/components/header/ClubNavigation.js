import React, { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ClubNavigation = () => {
  const { teams } = useContext(TeamsContext);
  const { user } = useContext(AuthContext);

  return (
    <ul className="mx-10 my-4 flex justify-center">
      {teams &&
        user &&
        teams
          .filter((team) => team.user_id !== user.id)
          .map((team) => (
            <li key={team.id} className="mx-4">
              <Link to={`/teams/${team.slug}`}>
                <img src={team.shield} className="w-8 h-8" alt={team.name} />
              </Link>
            </li>
          ))}
    </ul>
  );
};

export default ClubNavigation;
