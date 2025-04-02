import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrganizerSelectTaskPage() {
    const navigate = useNavigate();

    const handleCreateNew = () => {
        // Takes them to the page to create a new event
        navigate('/create');
    };

    const handleUpdateExisting = () => {
        // Possibly navigate to a page or prompt for an eventId
        // For now, let's just navigate to "enter-event"
        // or you could do a new route e.g. /update-event
        navigate('/enter-event');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>I want to...</h2>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleCreateNew}>Make a new event</button>
                <button onClick={handleUpdateExisting}>Join an existing event</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleBack}>Back</button>
            </div>
        </div>
    );
}

export default OrganizerSelectTaskPage;
