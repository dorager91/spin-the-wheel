// src/pages/WinnerPage.js
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wheel from '../components/Wheel';

function WinnerPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const { state } = useLocation();
    const finalAngle = state?.finalAngle || 0;

    const event = useSelector(state => state.events.events[eventId]);
    if (!event) {
        return <div>No event found with ID: {eventId}</div>;
    }

    const { name, winner, timeSlots } = event;

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>WINNER!</h2>
            <p>
                <strong>Event ID:</strong> {eventId} <br/>
                <strong>Event Name:</strong> {name}
            </p>

            {winner ? (
                <div>
                    <h3>{winner.label}</h3>
                    {/* Optionally show final wheel with highlight */}
                    <Wheel slots={timeSlots} rotationAngle={finalAngle}/>
                </div>
            ) : (
                <p>No winner was chosen yet.</p>
            )}

            <button onClick={handleBack} style={{ marginTop: '20px' }}>
                Back
            </button>
        </div>
    );
}

export default WinnerPage;
