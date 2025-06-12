import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function UsersTable({ users, fetchUsers, updateScore, deleteUser, filter }) {
  function showUserDetails(user) {
    alert(`Name: ${user.name}\nAge: ${user.age}\nAddress: ${user.address}`);
  }
  // Filter users by name (case-insensitive)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredUsers.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table className="table">
      <thead> 
        <tr>
          <th className="table-bordered">Name</th>
          <th className="table-bordered">Score</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr key={user.id}>
            <td className="table-bordered">
              <button
                style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                onClick={() => showUserDetails(user)}
              >
                {user.name}
              </button>
            </td>
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
  const [filter, setFilter] = useState('');

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
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{border: '2px solid #000', marginBottom: '1em', padding: '0.5em', fontSize: '1em' }}
      />
      <UsersTable
        users={users}
        fetchUsers={fetchUsers}
        updateScore={updateScore}
        deleteUser={deleteUser}
        filter={filter}
      />
      <button className="word-btn" style={{ marginTop: '1em' }} onClick={createUser}>Create User</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);