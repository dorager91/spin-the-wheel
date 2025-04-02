import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/enterEventID.css';

function EnterEventID() {
  const navigate = useNavigate();
  const [eventId, setEventId] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    if (!eventId.trim()) {
      setError("Please enter your event ID before you proceed");
      return;
    }
    setError('');
    navigate(`/lobby/${eventId}`);
  };

  return (
    <div className="enter-event-container">
      <h2 className="enter-event-title">Please Enter Your Event ID</h2>
      <div className="enter-event-form">
        <label>Event ID:</label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => {
            setEventId(e.target.value);
            if (e.target.value.trim()) {
              setError('');
            }
          }}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="button-group">
        <button className="back-button" onClick={handleBack}>Back</button>
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default EnterEventID;
