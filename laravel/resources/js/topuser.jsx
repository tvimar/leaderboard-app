import { useState, useEffect } from 'react';

function TopUser() {
  const [topUser, setTopUser] = useState(null);

  let timestamp = new Date().toLocaleTimeString();
  // Fetch the top user every 5 minutes

  useEffect(() => {
    function fetchTopUser() {
      fetch('http://localhost:8000/api/top-user')
        .then(res => res.json())
        .then(data => setTopUser(data));
    }

    fetchTopUser(); // Initial fetch
    // const interval = setInterval(fetchTopUser, 5 * 60 * 1000); // Every 5 minutes
    const interval = setInterval(fetchTopUser, 10 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  console.log('Top User:', topUser);

  const isTopEmptyOrNull = !topUser || Object.keys(topUser).length === 0;

  if (isTopEmptyOrNull) {
    return <div>No winner: (tie or no users).</div>
  } else {
    return (
        <div>
            <h2>Current Winner</h2>
            <p>Name: {topUser.name}</p>
            <p>Score: {topUser.score}</p>
            <p>Time: {timestamp}</p>
        </div>
    );
  }
}

export default TopUser;