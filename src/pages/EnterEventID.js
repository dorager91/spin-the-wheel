import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterEventID() {
    const navigate = useNavigate();
    const [eventId, setEventId] = useState('');

    const handleBack = () => {
        navigate('/');
    };

    const handleNext = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Please Enter Your Event ID</h2>
            <div>
                <label>Event ID:</label>
                <input
                    type="text"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default EnterEventID;
