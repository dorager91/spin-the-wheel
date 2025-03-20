import React from 'react';
import { useSelector } from 'react-redux';

const Result = () => {
    const winner = useSelector(state => state.slots.winner);

    return (
        <div className="result">
            <h2>Result 🎉</h2>
            {winner ? (
                <p>The meeting time is <strong>{winner.label}</strong> with {winner.chips} chips!</p>
            ) : (
                <p>No spin yet!</p>
            )}
        </div>
    );
};

export default Result;
