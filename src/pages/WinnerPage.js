import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function WinnerPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const winner = useSelector(state => state.slots.winner);

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Winner for Event: {eventId}</h2>
            {winner ? (
                <p>
                    The chosen time is <strong>{winner.label}</strong>
                    with {winner.chips} chips!
                </p>
            ) : (
                <p>No spin result yet.</p>
            )}
            <button onClick={handleBack}>Back to Lobby</button>
        </div>
    );
}

export default WinnerPage;
