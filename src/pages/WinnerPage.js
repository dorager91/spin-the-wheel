import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wheel from '../components/Wheel';
import '../styles/winnerPage.css';

function WinnerPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const finalAngle = state?.finalAngle || 0;

  const event = useSelector(state => state.events.events[eventId]);
  if (!event) {
    return <div>No event found with ID: {eventId}</div>;
  }

  const { name, deadline, timeSlots, winner } = event;
  // Since winner is stored as the entire slot object:
  const winningSlot = winner; // no need to find

  const handleBack = () => {
    navigate(`/lobby/${eventId}`);
  };

  return (
    <div className="winner-page-container">
      <header className="event-info">
        <h2>{name}</h2>
        <p><strong>Event ID:</strong> {eventId}</p>
        <p><strong>Deadline:</strong> {deadline}</p>
      </header>

      <section className="slot-list">
        <h3>Time Slots</h3>
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
      </section>

      <section className="wheel-section">
        <div className="wheel-wrapper">
          <Wheel
            slots={timeSlots}
            rotationAngle={finalAngle}
            highlightedSlotId={winningSlot ? winningSlot.id : null}
          />
        </div>
        {winningSlot ? (
          <p className="winner-text">
            Winning Slot: <strong>{winningSlot.label}</strong> ({winningSlot.chips} stickers)
          </p>
        ) : (
          <p className="no-winner">No winner was chosen yet.</p>
        )}
      </section>

      <button className="back-button" onClick={handleBack}>
        Back to Lobby
      </button>
    </div>
  );
}

export default WinnerPage;
