import React, { useState, useEffect, useContext } from "react";
import { ClausesTable } from "./ClausesTable";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const ClausesMarket = () => {
  const { user, token } = useContext(AuthContext);
  const [clauses, setClauses] = useState();

  const handleResponseOffer = (clause) => {
    setClauses({
      ...clauses,
      [clause.player_id]: [
        ...clauses[clause.player_id].filter((o) => o.id !== clause.id),
        clause,
      ].sort((a, b) => Number(a.id) - Number(b.id)),
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/clauses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setClauses(res.data);
      });
  }, []);

  return <ClausesTable clauses={clauses} onUpdate={handleResponseOffer} />;
};
