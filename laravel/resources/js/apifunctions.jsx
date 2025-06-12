import { useEffect, useState } from 'react';
import React from 'react';

export function fetchUsers() {
    fetch('http://localhost:8000/api/users')
        .then(response => response.json())
        .then(data => setUsers(data));
}

useEffect(() => {
    fetchUsers();
}, []);

export function updateScore(userId, score) {
    fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: score }),
    }).then(response => {
        if (response.ok) fetchUsers();
    });
}

export function createUser() {
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

export function deleteUser(userId) {
    fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
    }).then(response => {
        if (response.ok) fetchUsers();
    });
}

export function handleSort(column) {
    if (sortBy === column) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
        setSortBy(column);
        setSortDir('asc');
    }
}