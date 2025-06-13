import React from 'react';

function UserDetailsModal({ user, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ marginTop: 0 }}>User Details</h2>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong> {user.name}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Age:</strong> {user.age}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Address:</strong> {user.address}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Score:</strong> {user.score}
        </div>
        <button
          className="word-btn"
          onClick={onClose}
          style={{ marginTop: '1rem' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UserDetailsModal;
