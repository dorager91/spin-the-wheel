import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addChipToSlot } from '../redux/eventSlice';
import Wheel from '../components/Wheel';
import '../styles/betPage.css';

function BetPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.events[eventId]);

    // Fallbacks if event doesn't exist
    const fallbackSlots = [];
    const timeSlots = event ? event.timeSlots : fallbackSlots;
    const chipsPerParticipant = event ? event.chipsPerParticipant : 0;
    const name = event ? event.name : '';
    const deadline = event ? event.deadline : '';

    const totalUsed = useMemo(() => {
        return timeSlots.reduce((sum, s) => sum + s.chips, 0);
    }, [timeSlots]);

    const chipsLeft = chipsPerParticipant - totalUsed;

    if (!event) {
        return <div>No event found with ID: {eventId}</div>;
    }

    const handleAddChip = (slotId) => {
        if (chipsLeft <= 0) return;
        dispatch(addChipToSlot({ eventId, slotId }));
    };

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div className="bet-page-container">
            <h2 className="bet-page-title">Place Your Stickers!</h2>
            <p className="bet-page-info">
                <strong>Event ID:</strong> {eventId} <br/>
                <strong>Event Name:</strong> {name} <br/>
                <strong>Stickers Available:</strong> {chipsLeft} / {chipsPerParticipant} <br/>
                <strong>Deadline:</strong> {deadline}
            </p>

            <div className="bet-page-content">
                {/* Left side: Chip controls */}
                <div className="chip-controls">
                    <h3>Current Stickers</h3>
                    {timeSlots.map(slot => (
                        <div key={slot.id} className="slot-item">
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: slot.color,
                                    marginRight: '8px'
                                }}
                            />
                            <span>
                                {slot.label} - Stickers: {slot.chips}
                            </span>
                            <button
                                className="add-chip-button"
                                onClick={() => handleAddChip(slot.id)}
                                disabled={chipsLeft <= 0}
                            >
                                +1 Sticker
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right side: The Wheel */}
                <div className="wheel-container">
                    <Wheel slots={timeSlots} />
                </div>
            </div>

            <button onClick={handleBack} className="back-button">
                Back to Lobby
            </button>
        </div>
    );
}

export default BetPage;
