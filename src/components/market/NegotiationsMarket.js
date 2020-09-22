import React, { useState, useEffect, useContext } from "react";
import { NegotiationsTable } from "./NegotiationsTable";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const NegotiationsMarket = () => {
  const { user, token } = useContext(AuthContext);
  const [negotiations, setNegotiations] = useState();

  /* const handleResponseOffer = (clause) => {
    setClauses({
      ...clauses,
      [clause.player_id]: [
        ...clauses[clause.player_id].filter((o) => o.id !== clause.id),
        clause,
      ].sort((a, b) => Number(a.id) - Number(b.id)),
    });
  }; */

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/negotiations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNegotiations(res.data);
      });
  }, []);

  return <NegotiationsTable negotiations={negotiations} />;
};
