import { useState, useEffect } from 'react';

function CurrentWinner() {
  const [currentWinner, setCurrentWinner] = useState(null);

  let timestamp = new Date().toLocaleTimeString();
  // Fetch the top user every 5 minutes

  useEffect(() => {
    function fetchCurrentWinner() {
      fetch('http://localhost:8000/api/current-winner')
        .then(res => res.json())
        .then(data => setCurrentWinner(data));
    }

    fetchCurrentWinner(); // Initial fetch
    // const interval = setInterval(fetchTopUser, 5 * 60 * 1000); // Every 5 minutes
    const interval = setInterval(fetchCurrentWinner, 10 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  console.log('Current Winner:', currentWinner);

  const isTopEmptyOrNull = !currentWinner || Object.keys(currentWinner).length === 0;

  if (isTopEmptyOrNull) {
    return <div>No winner: (tie or no users).</div>
  } else {
    return (
        <div>
            <h2>Current Winner</h2>
            <p>Name: {currentWinner.name}</p>
            <p>Score: {currentWinner.score}</p>
            <p>Time: {timestamp}</p>
        </div>
    );
  }
}

export default CurrentWinner;