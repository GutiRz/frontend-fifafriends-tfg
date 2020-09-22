import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import NegotiationRow from "./NegotiationRow";

export const NegotiationsWidget = ({ team, type }) => {
  const { token } = useContext(AuthContext);
  const [offers, setOffers] = useState();

  useEffect(() => {
    team &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/auth/negotiations/${type}/${team.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setOffers(res.data));
  }, []);

  const handleResponseOffer = (negotiation) => {
    setOffers([...offers.filter((o) => o.id !== negotiation.id), negotiation]);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {offers &&
          offers.map((negotiation) => (
            <NegotiationRow
              key={negotiation.id}
              negotiation={negotiation}
              onUpdate={handleResponseOffer}
              type={type}
            />
          ))}
      </ul>
    </div>
  );
};
