import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/role');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome! 🎉</h1>
            <p>I am ...</p>
            <button onClick={handleGetStarted}>Get Started</button>
        </div>
    );
}

export default WelcomePage;
