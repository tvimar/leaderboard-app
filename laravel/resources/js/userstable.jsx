import React from 'react';

function UsersTable({ users, fetchUsers, updateScore, deleteUser, filter, sortBy, sortDir, onSort }) {
  function showUserDetails(user) {
    alert(`Name: ${user.name}\nAge: ${user.age}\nAddress: ${user.address}`);
  }
  // Filter users by name (case-insensitive)
  let filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort users
  if (sortBy) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      if (sortBy === 'name') {
        return sortDir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'score') {
        return sortDir === 'asc'
          ? a.score - b.score
          : b.score - a.score;
      }
      return 0;
    });
  }

  if (filteredUsers.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th
            className="table-bordered table-striped"
            style={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => onSort('name')}
          >
            Name {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th
            className="table-bordered table-striped"
            style={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => onSort('score')}
          >
            Score {sortBy === 'score' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr key={user.id}>
            <td className="table-bordered table-striped">
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onClick={() => showUserDetails(user)}
              >
                {user.name}
              </button>
            </td>
            <td className="table-bordered table-striped">{user.score}</td>
            <td>
              <button className="score-btn" onClick={() => updateScore(user.id, user.score + 1)}>
                +
              </button>
              <button
                className="score-btn"
                onClick={() => updateScore(user.id, user.score - 1)}
                style={{ marginLeft: '0.5rem' }}
              >
                -
              </button>
              <button
                className="word-btn"
                onClick={() => deleteUser(user.id)}
                style={{ marginLeft: '0.5rem' }}
              >
                Delete User
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;