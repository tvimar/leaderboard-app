import { useState, useEffect } from 'react';

function CurrentWinner() {
  const [currentWinner, setCurrentWinner] = useState(null);
  const [timestamp, setTimestamp] = useState('');

  // Fetch the top user every 5 minutes

  function fetchCurrentWinner() {
    fetch('http://localhost:8000/api/current-winner')
      .then(res => res.json())
      .then(data => {
        setCurrentWinner(data);
        setTimestamp(new Date().toLocaleTimeString());
      });
  }

  console.log('Current Winner:', currentWinner);

  const isTopEmptyOrNull = !currentWinner || !currentWinner.winner;

  return (
    <div>
      <h1>Most Recent Winner</h1>
      Click the below button to update this page with the latest winner. <br /> 
      The winner is internally updated every 5 minutes. If there is a tie at update <br /> 
      time, a winner will not be declared and this entry will not be updated until <br /> 
      a solo winner exists at update time."<br /> 
      <button className="word-btn" style={{ marginTop: '1em' }} onClick={fetchCurrentWinner}>
        Update Current Winner
      </button>
      {isTopEmptyOrNull ? (
        <div>No winner recorded yet: (tie or no users).</div>
      ) : (
        <div>
          <h2>Current Winner</h2>
          <p>Name: {currentWinner.winner.name}</p>
          <p>Score at time of win: {currentWinner.current_score}</p>
          <p>Time: {timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default CurrentWinner;