import React, { useState } from 'react';
import UserDetailsModal from './UserDetailsModal';

function UsersTable({ users, fetchUsers, updateScore, deleteUser, filter, sortBy, sortDir, onSort }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showUserDetails(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
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
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th
              className="table-bordered table-striped table-header"
              onClick={() => onSort('name')}
            >
              Name {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="table-bordered table-striped table-header"
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
                  className="user-name-button"
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
                  className="score-btn action-button-spacing"
                  onClick={() => updateScore(user.id, user.score - 1)}
                >
                  -
                </button>
                <button
                  className="word-btn action-button-spacing"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default UsersTable;