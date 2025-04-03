import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addChipToSlot, removeChipFromSlot, addTimeSlot, removeTimeSlot } from '../redux/eventSlice';
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
    const [newSlotDate, setNewSlotDate] = useState('');
    const [newSlotTime, setNewSlotTime] = useState('');

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

    const handleRemoveTimeSlot = (slotId, slotLabel) => {
        const confirmed = window.confirm(`Are you sure you want to remove this time slot "${slotLabel}"?`);
        if (confirmed) {
            dispatch(removeTimeSlot({ eventId, slotId }));
        }
    };

    const handleAddTimeSlot = () => {
        if (!newSlotDate || !newSlotTime) return;
        const label = `${newSlotDate} ${newSlotTime}`;
        const colorPalette = [
            '#FF6363', '#FFA600', '#FFBD69', '#58508D', '#BC5090',
            '#34D399', '#60A5FA', '#A78BFA', '#F87171', '#FBBF24'
        ];
        const color = colorPalette[timeSlots.length % colorPalette.length];
        dispatch(addTimeSlot({ eventId, label, chips: 0, color }));
        setNewSlotDate('');
        setNewSlotTime('');
    };

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div className="bet-page-container">
            <h2 className="bet-page-title">Place Your Stickers<br /> or<br /> Modify Time Slots!</h2>
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
                            <button
                                className="remove-slot-button"
                                onClick={() => handleRemoveTimeSlot(slot.id, slot.label)}
                                title="Remove Time Slot"
                            >
                                &#8722;
                            </button>
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
                    <div className="new-slot-form">
                        <h3>Add a New Time Slot</h3>
                        <div>
                            <input
                                type="text"
                                placeholder="MM/DD"
                                value={newSlotDate}
                                onChange={(e) => setNewSlotDate(e.target.value)}
                                className="date-input"
                            />
                            <input
                                type="text"
                                placeholder="Time (e.g., 11am)"
                                value={newSlotTime}
                                onChange={(e) => setNewSlotTime(e.target.value)}
                                className="time-input"
                            />
                            <button onClick={handleAddTimeSlot}>Add Time Slot</button>
                        </div>
                    </div>
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
