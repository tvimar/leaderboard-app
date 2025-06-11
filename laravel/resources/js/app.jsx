import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users') // Adjust port if needed
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.address}</td>
            <td>{user.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div>
      <h1>User List</h1>
      <UsersTable />
    </div>
  );
}

// This is required to actually render your App component!
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);