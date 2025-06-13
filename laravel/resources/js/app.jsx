import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import UsersTable from './UsersTable';
import CurrentWinner from './currentwinner';
import CreateUserModal from './CreateUserModal';
import QrCodeViewer from './QrCodeViewer';

function App() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  function createUser(userData) {
    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(response => {
      if (response.ok) {
        fetchUsers();
        setIsModalOpen(false);
      }
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
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1em' }}>
        <button className="word-btn" onClick={() => setIsModalOpen(true)}>
          Create User
        </button>
        <QrCodeViewer />
      </div>
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createUser}
      />
      <CurrentWinner />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);