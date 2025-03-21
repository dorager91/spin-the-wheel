import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelectPage() {
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
            <h2>Select Your Role</h2>
            <button onClick={handleOrganizer}>I am an Organizer</button>
            <button onClick={handleParticipant}>I am a Participant</button>
        </div>
    );
}

export default RoleSelectPage;
