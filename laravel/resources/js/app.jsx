import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import UsersTable from './UsersTable';
import TopUser from './topuser';

function App() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('asc');

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
      body: JSON.stringify({ score: score }),
    }).then(response => {
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
      body: JSON.stringify({ name: name, age: age, address: address }),
    }).then(response => {
      if (response.ok) fetchUsers();
    });
  }

  function deleteUser(userId) {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) fetchUsers();
    });
  }

  function handleSort(column) {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  }

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{
          border: '2px solid #000',
          marginBottom: '1em',
          padding: '0.5em',
          fontSize: '1em',
        }}
      />
      <UsersTable
        users={users}
        fetchUsers={fetchUsers}
        updateScore={updateScore}
        deleteUser={deleteUser}
        filter={filter}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={handleSort}
      />
      <button className="word-btn" style={{ marginTop: '1em' }} onClick={createUser}>
        Create User
      </button>
      <TopUser />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);