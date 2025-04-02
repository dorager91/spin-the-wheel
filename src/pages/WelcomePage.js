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
            <br />
            <p className="welcome-description">
                Imagine planning your meeting like a fun game! <br />
                Every possible meeting time is a vibrant slice on our wheel. <br />
                Simply add your “stickers” to the times you prefer – the more stickers a slice gets, the higher its chance to win.
                When the deadline hits, we’ll spin the wheel and let fate decide your meeting time. <br />
                Turn scheduling into an exciting adventure! <br />
                Ready to get started? <br />
            </p>
            <div className="button-group">
                <strong>Choose your role:</strong>
                <button className="organizer-button" onClick={handleOrganizer}>An Organizer</button>
                <button className="participant-button" onClick={handleParticipant}>A Participant</button>
            </div>
        </div>
    );
}

export default WelcomePage;
