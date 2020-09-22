import React, { useEffect, useContext, useState } from "react";
import { Shell } from "../components/Shell";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { PlayerTable } from "../components/team/PlayerTable";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { NegotiationsWidget } from "../components/dashboard/NegotiationsWidget";
import { ClausesWidget } from "../components/dashboard/ClausesWidget";

export const DashboardPage = () => {
  const { token, user } = useContext(AuthContext);
  const [team, setTeam] = useState({ players: [] });

  useEffect(() => {
    user &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/auth/teams/${user.team.slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTeam(res.data);
        });
  }, [user, token]);

  return (
    <Shell header={<DashboardHeader team={team} />}>
      <h2 className="text-xl font-semibold text-gray-700 leading-tight mt-5 mb-3">
        Mi plantilla
      </h2>
      <PlayerTable players={team.players} />

      <h2 className="text-xl font-semibold text-gray-700 leading-tight mt-5 mb-3">
        Ofertas recibidas
      </h2>
      {user && <NegotiationsWidget team={user.team} type="incoming" />}

      <h2 className="text-xl font-semibold text-gray-700 leading-tight mt-5 mb-3">
        Ofertas realizadas
      </h2>
      {user && <NegotiationsWidget team={user.team} type="outgoing" />}

      {/* <h2 className="text-xl font-semibold text-gray-700 leading-tight mt-5 mb-3">
        Cláusulas activas
      </h2>
      {user && <ClausesWidget team={user.team} type="outgoing" />} */}
    </Shell>
  );
};
