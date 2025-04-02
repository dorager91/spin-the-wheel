import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wheel from '../components/Wheel';
import '../styles/winnerPage.css';

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
        <div className="winner-page-container">
            <h2 className="winner-title">WINNER!</h2>
            <p className="winner-info">
                <strong>Event ID:</strong> {eventId} <br />
                <strong>Event Name:</strong> {name}
            </p>

            {winner ? (
                <div className="winner-details">
                    <h3 className="winner-label">{winner.label}</h3>
                    <Wheel slots={timeSlots} rotationAngle={finalAngle} />
                </div>
            ) : (
                <p className="no-winner">No winner was chosen yet.</p>
            )}

            <button className="back-button" onClick={handleBack}>
                Back
            </button>
        </div>
    );
}

export default WinnerPage;
