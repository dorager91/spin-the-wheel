import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LobbyPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const event = useSelector(state => state.events.events[eventId]);

    if (!event) {
        return <div>No event found for ID: {eventId}</div>;
    }

    const handleBet = () => {
        navigate(`/bet/${eventId}`);
    };

    const handleSpin = () => {
        navigate(`/spin/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Lobby for Event: {event.name}</h2>
            <p>Deadline: {event.deadline}</p>
            {/* Possibly display event.timeSlots info here */}
            <button onClick={handleBet}>Place Bets</button>
            <button onClick={handleSpin}>Spin the Wheel</button>
        </div>
    );
}

export default LobbyPage;
