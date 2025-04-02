import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcomePage.css';

function WelcomePage() {
    const navigate = useNavigate();

    const handleOrganizer = () => {
        navigate('/organizer-tasks');
    };

    const handleParticipant = () => {
        navigate('/enter-event');
    };

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">🎉 Welcome to Spin-the-Wheel Scheduler 🎡</h1>
            <p className="welcome-description">
                This conceptual model represents all possible meeting times as slices on “Spin the Wheel”. 
                Participants place “stickers” on the time(s) they prefer. More “stickers” on a slice gives it a higher probability of winning. 
                Once the deadline is met, the wheel is spun—whichever slice wins the spin is the chosen time.
            </p>
            <div className="button-group">
                <button className="organizer-button" onClick={handleOrganizer}>An Organizer</button>
                <button className="participant-button" onClick={handleParticipant}>A Participant</button>
            </div>
        </div>
    );
}

export default WelcomePage;
