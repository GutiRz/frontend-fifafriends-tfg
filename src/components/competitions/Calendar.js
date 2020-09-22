import React, { useState, useEffect, useContext } from "react";
import { CalendarRound } from "./CalendarRound";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const Calendar = () => {
  const { token } = useContext(AuthContext);

  const [rounds, setRounds] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/competitions/rounds/18`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRounds(groupBy(res.data.competition_matches, "round"));
      });
  }, []);

  function groupBy(collection, property) {
    var i = 0,
      val,
      index,
      values = [],
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  const handleResponseResult = (match) => {
    console.log(match);
    let roundUpdated = rounds[match.round - 1];
    roundUpdated = [...roundUpdated.filter(m => m.id !== match.id), match]
    setRounds([...rounds.filter((r) => r.id !== roundUpdated.id), roundUpdated]);
  };

  return (
    <div>
      {rounds &&
        rounds.map((round, index) => (
          <CalendarRound
            round={round}
            roundNumber={index + 1}
            key={index}
            onUpdate={handleResponseResult}
          />
        ))}{" "}
    </div>
  );
};
