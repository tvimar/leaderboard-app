import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function UsersTable({ users, fetchUsers, updateScore, deleteUser }) {
  return (
    <table className="table">
      <thead> 
        <tr>
          <th className="table-bordered">Name</th>
          <th className="table-bordered">Score</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="table-bordered">{user.name}</td>
            <td className="table-bordered">{user.score}</td>
            <td>
              <button className="score-btn" onClick={() => updateScore(user.id, user.score + 1)}>+</button>
              <button className="score-btn" onClick={() => updateScore(user.id, user.score - 1)} style={{ marginLeft: '0.5rem' }}>-</button>
              <button className="word-btn" onClick={() => deleteUser(user.id)} style={{ marginLeft: '0.5rem' }}>Delete User</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [users, setUsers] = useState([]);

  function fetchUsers() {
    fetch('http://localhost:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function updateScore(userId, score) {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "score" : score }),
    })
      .then(response => {
        if (response.ok) fetchUsers();
      });
  }

  function createUser() {
    const name = prompt('Enter user name:');
    const age = prompt('Enter user age:');
    const address = prompt('Enter user address:');
    if (!name || !age || !address) return;
    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name" : name, "age": age, "address": address }),
    })
      .then(response => {
        if (response.ok) fetchUsers();
      });
  }

  function deleteUser(userId) {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) fetchUsers();
      });
  }

  return (
    <div>
      <h1>User List</h1>
      <UsersTable users={users} fetchUsers={fetchUsers} updateScore={updateScore} deleteUser={deleteUser} />
      <button className="word-btn" style={{ marginTop: '1em' }} onClick={createUser}>Create User</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);