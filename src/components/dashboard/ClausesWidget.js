import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ClausesTable } from "../market/ClausesTable";
import { ClausesRow } from "../market/ClausesRow";

export const ClausesWidget = ({ team, type }) => {
  const { token } = useContext(AuthContext);
  const [clauses, setClauses] = useState();

  useEffect(() => {
    team &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/auth/clauses/${type}/${team.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setClauses(res.data));
  }, []);

  const handleResponseClause = (clause) => {
    setClauses([...clauses.filter((o) => o.id !== clause.id), clause]);
  };

  return <div className="bg-white shadow overflow-hidden sm:rounded-md"></div>;
};
