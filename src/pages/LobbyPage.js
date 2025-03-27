import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wheel from '../components/Wheel';

function LobbyPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const event = useSelector(state => state.events.events[eventId]);

    if (!event) {
        return <div>No event found for ID: {eventId}</div>;
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
        <div style={{ margin: '50px', textAlign: 'center' }}>
            <h2>{name}</h2>
            <p><strong>Event ID:</strong> {eventId}</p>

            <p><strong>Deadline:</strong> {deadline}</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '40px' }}>
                {/* Left side: timeslot list */}
                <div style={{ textAlign: 'left' }}>
                    <h3>Current Timeslots</h3>
                    {timeSlots.map(slot => (
                        <div key={slot.id} style={{ marginBottom: '8px' }}>
              <span
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

                <div>
                    <Wheel slots={timeSlots} />
                </div>
            </div>
            <div style={{ marginTop: '30px' }}>
                <button
                    onClick={handleBet}
                    style={{
                        marginRight: '20px',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Place Stickers
                </button>
                <button
                    onClick={handleSpin}
                    style={{
                        marginRight: '20px',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Spin the Wheel
                </button>
                <button
                    onClick={handleEnterID}
                    style={{
                        marginRight: '20px',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    View Another Event
                </button>
            </div>
        </div>
    );
}

export default LobbyPage;
