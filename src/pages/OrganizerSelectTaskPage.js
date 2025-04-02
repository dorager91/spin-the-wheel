import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/organizerSelectTaskPage.css';

function OrganizerSelectTaskPage() {
    const navigate = useNavigate();

    const handleCreateNew = () => {
        // Navigate to the page to create a new event
        navigate('/create');
    };

    const handleUpdateExisting = () => {
        // Navigate to the page for joining an existing event
        navigate('/enter-event');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="organizer-task-container">
            <h2 className="organizer-task-title">I want to...</h2>
            <div className="button-group">
                <button className="organizer-action-button" onClick={handleCreateNew}>
                    Make a new event
                </button>
                <button className="join-event-button" onClick={handleUpdateExisting}>
                    Join an existing event
                </button>
            </div>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default OrganizerSelectTaskPage;
