import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parseCSV } from '../utils/csv';

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Load match details
    fetch('/matches.csv')
      .then((res) => res.text())
      .then((data) => {
        const parsedData = parseCSV(data);
        const selectedMatch = parsedData.find((m) => m.ID === matchId);
        setMatch(selectedMatch);
      });

    // Load team data
    fetch('/teams.csv')
      .then((res) => res.text())
      .then((data) => {
        setTeams(parseCSV(data));
      });
  }, [matchId]);

  if (!match) return <div>Loading...</div>;

  const teamA = teams.find((team) => team.ID === match.ATeamID);
  const teamB = teams.find((team) => team.ID === match.BTeamID);

  return (
    <div>
      <h2>Match Result: {match.Score}</h2>
      <div className="team-details">
        <div>
          <h3>{teamA?.Name}</h3>
          <p>Manager: {teamA?.ManagerFullName}</p>
        </div>
        <div>
          <h3>{teamB?.Name}</h3>
          <p>Manager: {teamB?.ManagerFullName}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
