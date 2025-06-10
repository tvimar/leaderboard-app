import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('/api/leaderboard');
                const data = await response.json();
                setScores(data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>
                        {score.name}: {score.points}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;