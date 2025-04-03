import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addChipToSlot, removeChipFromSlot } from '../redux/eventSlice';
import Wheel from '../components/Wheel';
import '../styles/betPage.css';

function BetPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve event and user data from Redux
    const event = useSelector(state => state.events.events[eventId]);
    const user = useSelector(state => state.user); // { role, userId }

    // Always call hooks unconditionally
    const [userStickersPlaced, setUserStickersPlaced] = useState(0);

    // Use fallback values if event is null, ensuring hooks are always called
    const timeSlots = event ? event.timeSlots : [];
    const chipsPerParticipant = event ? event.chipsPerParticipant : 0;
    const name = event ? event.name : '';
    const deadline = event ? event.deadline : '';
    const userStickersLeft = chipsPerParticipant - userStickersPlaced;

    const totalUsed = useMemo(() => {
        return timeSlots.reduce((sum, s) => sum + s.chips, 0);
    }, [timeSlots]);

    // Now conditionally render if event is not available
    if (!event) {
        return <div>No event found with ID: {eventId}</div>;
    }

    const handleAddChip = (slotId) => {
        if (userStickersLeft <= 0) return;
        dispatch(addChipToSlot({ eventId, slotId }));
        setUserStickersPlaced(prev => prev + 1);
    };

    const handleRemoveChip = (slotId) => {
        if (userStickersPlaced <= 0) return;
        dispatch(removeChipFromSlot({ eventId, slotId }));
        setUserStickersPlaced(prev => prev - 1);
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
                <span className="highlighted-info">
                    <strong>Stickers Available:</strong> {userStickersLeft} / {chipsPerParticipant}
                </span> <br/>
                <strong>Deadline:</strong> {deadline}
            </p>

            <div className="bet-page-content">
                {/* Left side: Chip controls */}
                <div className="chip-controls">
                    <h3>Current Stickers on Time Slots</h3>
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
                                disabled={userStickersLeft <= 0}
                                style={{ marginLeft: '10px', marginRight: '5px' }}
                            >
                                +1 Sticker
                            </button>
                            <button
                                className="remove-chip-button"
                                onClick={() => handleRemoveChip(slot.id)}
                                disabled={slot.chips <= 0}
                            >
                                -1 Sticker
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
                Event Lobby
            </button>
        </div>
    );
}

export default BetPage;
