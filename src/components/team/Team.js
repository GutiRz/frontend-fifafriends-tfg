import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PlayerCard } from "./PlayerCard";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NegotiationModal } from "./NegotiationModal";
import { ClauseModal } from "./ClauseModal";

export const Team = () => {
  const { token } = useContext(AuthContext);
  const [team, setTeam] = useState();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showModalClause, setShowModalClause] = useState(false);
  const [playerClause, setPlayerClause] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/teams/${params.team}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTeam(res.data));
  }, [params.team]);

  function handleShowModal(newValue) {
    setShowModal(newValue);
  }

  function handleShowModalClause(newValue, player) {
    setShowModalClause(newValue);
    setPlayerClause(player);
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {team &&
          team.players.map((player) => (
            <PlayerCard
              player={player}
              onOffer={handleShowModal}
              onClause={handleShowModalClause}
              key={player.id}
            />
          ))}
      </ul>
      {showModal && (
        <NegotiationModal showModal={showModal} onClose={handleShowModal} />
      )}

      {showModalClause && (
        <ClauseModal
          showModalClause={showModalClause}
          onClose={handleShowModalClause}
          playerClause={playerClause}
        />
      )}
    </div>
  );
};
