import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wheel from '../components/Wheel';
import '../styles/lobbyPage.css';

function LobbyPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = useSelector(state => state.events.events[eventId]);

  if (!event) {
    return (
      <div className="not-found-container">
        <h2 className="not-found-title">Event Not Found</h2>
        <p className="not-found-info">
          We could not find an event with ID: <strong>{eventId}</strong>.
        </p>
        <button className="back-button" onClick={() => navigate('/enter-event')}>
          Try Another Event ID
        </button>
      </div>
    );
  }

  const { name, deadline, timeSlots } = event;

  const handleBet = () => {
    navigate(`/bet/${eventId}`);
  };

  const handleSpin = () => {
    navigate(`/spin/${eventId}`);
  };

  const handleEnterID = () => {
    navigate(`/enter-event`);
  };

  return (
    <div className="lobby-container">
      <h2 className="lobby-title">{name}</h2>
      <p className="lobby-info">
        <strong>Event ID:</strong> {eventId} <br />
        <strong>Deadline:</strong> {deadline}
      </p>

      <div className="lobby-content">
        {/* Left side: Timeslot list */}
        <div className="timeslot-list">
          <h3>Current Timeslots</h3>
          {timeSlots.map(slot => (
            <div key={slot.id} className="slot-item">
              <span
                className="slot-color"
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: slot.color,
                  marginRight: '8px'
                }}
              />
              {slot.label} - Stickers: {slot.chips}
            </div>
          ))}
        </div>

        {/* Right side: Wheel preview */}
        <div className="wheel-container">
          <Wheel slots={timeSlots} />
        </div>
      </div>

      <div className="button-group">
        <button className="green-button" onClick={handleBet}>
          Place Stickers
        </button>
        <button className="blue-button" onClick={handleSpin}>
          Spin the Wheel
        </button>
        <button className="grey-button" onClick={handleEnterID}>
          View Another Event
        </button>
      </div>
    </div>
  );
}

export default LobbyPage;
