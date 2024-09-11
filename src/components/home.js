// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { parseCSV } from '../utils/csv';

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Load teams.csv
    fetch('/teams.csv') // Ensure correct file path
      .then(res => res.text())
      .then(data => {
        const parsedTeams = parseCSV(data);
        setTeams(parsedTeams);
      });

    // Load players.csv
    fetch('/players.csv')
      .then(res => res.text())
      .then(data => {
        const parsedPlayers = parseCSV(data);
        setPlayers(parsedPlayers);
      });

    // Load records.csv
    fetch('/records.csv')
      .then(res => res.text())
      .then(data => {
        const parsedRecords = parseCSV(data);
        setRecords(parsedRecords);
      });
  }, []);

  return (
    <div>
      <h1>Football Tournament</h1>

      {/* Teams List */}
      <h2>Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.ID}>{team.Name} - Manager: {team.ManagerFullName}</li>
        ))}
      </ul>

      {/* Players List */}
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.ID}>{player.FullName} - {player.Position} (Team: {player.TeamID})</li>
        ))}
      </ul>

      {/* Records List */}
      <h2>Match Records</h2>
      <ul>
        {records.map(record => (
          <li key={record.ID}>
            Player ID: {record.PlayerID}, Match ID: {record.MatchID}, From: {record.fromMinutes} to {record.toMinutes || 'End'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
