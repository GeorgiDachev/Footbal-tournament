import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parseCSV } from '../utils/csv';

const TeamDetails = () => {
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Load player data
    fetch('/players.csv')
      .then((res) => res.text())
      .then((data) => {
        const allPlayers = parseCSV(data);
        const teamPlayers = allPlayers.filter((player) => player.TeamID === teamId);
        setPlayers(teamPlayers);
      });
  }, [teamId]);

  return (
    <div>
      <h1>Team Roster</h1>
      <ul>
        {players.map((player) => (
          <li key={player.ID}>{player.FullName} - {player.Position}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;
