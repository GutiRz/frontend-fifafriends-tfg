import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { StatsTabs } from "./StatsTabs";

export const Stats = () => {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/competitions/stats/18`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data);
      });
  }, []);

  return <div>{stats && <StatsTabs stats={stats} />}</div>;
};
