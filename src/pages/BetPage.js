// src/pages/BetPage.js
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
    const [newSlotDate, setNewSlotDate] = useState('');
    const [newSlotTime, setNewSlotTime] = useState('');

    // Local state to track how many stickers the current user placed per slot:
    // Structure: { [slotId]: number }
    const [userAllocation, setUserAllocation] = useState({});

    // Use fallback values if event is null
    const timeSlots = event ? event.timeSlots : [];
    const chipsPerParticipant = event ? event.chipsPerParticipant : 0;
    const name = event ? event.name : '';
    const deadline = event ? event.deadline : '';

    // Compute total stickers the user has placed (across all slots)
    const userStickersPlaced = useMemo(() => {
        return Object.values(userAllocation).reduce((sum, val) => sum + val, 0);
    }, [userAllocation]);

    // Compute stickers left for the current user
    const userStickersLeft = chipsPerParticipant - userStickersPlaced;

    // Compute total global stickers used (for wheel display)
    const totalUsed = useMemo(() => {
        return timeSlots.reduce((sum, s) => sum + s.chips, 0);
    }, [timeSlots]);

    if (!event) {
        return <div>No event found with ID: {eventId}</div>;
    }

    const handleAddChip = (slotId) => {
        if (userStickersLeft <= 0) return;
        dispatch(addChipToSlot({ eventId, slotId }));
        setUserAllocation(prev => ({
            ...prev,
            [slotId]: (prev[slotId] || 0) + 1
        }));
    };

    const handleRemoveChip = (slotId) => {
        // Only allow removal if the current user has placed at least one sticker on this slot.
        if (!userAllocation[slotId] || userAllocation[slotId] <= 0) return;
        dispatch(removeChipFromSlot({ eventId, slotId }));
        setUserAllocation(prev => ({
            ...prev,
            [slotId]: prev[slotId] - 1
        }));
    };

    const handleRemoveTimeSlot = (slotId, slotLabel) => {
        const confirmed = window.confirm(`Are you sure you want to remove this time slot "${slotLabel}"?`);
        if (confirmed) {
            dispatch(removeTimeSlot({ eventId, slotId }));
            // Remove any allocation for this slot from the local state
            setUserAllocation(prev => {
                const { [slotId]: removed, ...rest } = prev;
                return rest;
            });
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
                <strong>Stickers Available:</strong> {userStickersLeft} / {chipsPerParticipant} <br/>
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
                                // Disable if current user has not placed any sticker on this slot
                                disabled={!(userAllocation[slot.id] > 0)}
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
                                placeholder="eg. 11am"
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
