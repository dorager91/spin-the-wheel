import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    const handleOrganizer = () => {
        // navigate to OrganizerSelectTaskPage
        navigate('/organizer-tasks');
    };

    const handleParticipant = () => {
        // Route to the new EnterEventID page
        navigate('/enter-event');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>🎉Welcome to</h1>
            <h1>Spin-the-Wheel Scheduler 🎡</h1>
            <h3>I am ...</h3>
            <button onClick={handleOrganizer}>An Organizer</button>
            <button onClick={handleParticipant}>A Participant</button>
        </div>
    );
}

export default WelcomePage;
