// src/pages/SpinPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Wheel from '../components/Wheel';
import { spinWheel } from '../redux/eventSlice';

function SpinPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useStore();
    const [rotationAngle, setRotationAngle] = useState(0);
    const [spinning, setSpinning] = useState(false);

    const event = useSelector(state => state.events.events[eventId]) || null;

    if (!event) {
        return <div>No event found with ID: {eventId}</div>;
    }

    const { name, deadline, timeSlots, winner } = event;

    // Calculate total stickers used
    const totalUsed = timeSlots.reduce((sum, s) => sum + s.chips, 0);

    const computeSpinAngle = (slots, winnerSlot) => {
        if (!winnerSlot) return 0;

        const fullSpins = 10; // for animation
        const totalStickers = slots.reduce((sum, s) => sum + s.chips, 0);
        if (totalStickers === 0) return 0;

        let currentAngle = 0;
        let chosenSlotStart = 0;
        let chosenSlotEnd = 0;

        for (let slot of slots) {
            const sliceAngle = (slot.chips / totalStickers) * 360;
            const slotStartAngle = currentAngle;
            const slotEndAngle = currentAngle + sliceAngle;

            if (slot.id === winnerSlot.id) {
                chosenSlotStart = slotStartAngle;
                chosenSlotEnd = slotEndAngle;
                break;
            }
            currentAngle += sliceAngle;
        }

        // Add a small margin
        const margin = 1;
        const safeStart = chosenSlotStart + margin;
        const safeEnd = chosenSlotEnd - margin;

        if (safeEnd < safeStart) {
            return 360 * fullSpins - (chosenSlotStart + (chosenSlotEnd - chosenSlotStart) / 2);
        }

        const randomAngleInSlice = safeStart + Math.random() * (safeEnd - safeStart);
        const finalRotation = 360 * fullSpins - randomAngleInSlice;
        return finalRotation;
    };

    const handleSpin = () => {
        // Dispatch action to compute winner
        dispatch(spinWheel({ eventId }));
        // Get updated event from Redux store
        const updatedEvent = store.getState().events.events[eventId];
        const finalAngle = computeSpinAngle(updatedEvent.timeSlots, updatedEvent.winner);
        setRotationAngle(finalAngle);
        setSpinning(true);

        setTimeout(() => {
            setSpinning(false);
            navigate(`/winner/${eventId}`, { state: { finalAngle } });
        }, 3000);
    };

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div style={{ margin: '50px', textAlign: 'center' }}>
            <h2>Spin the Wheel to Create a Winner!</h2>
            <p>
                <strong>Event ID:</strong> {eventId} <br />
                <strong>Event Name:</strong> {name} <br />
                <strong>Deadline:</strong> {deadline}
            </p>

            <div style={{ textAlign: 'left', margin: '20px auto', maxWidth: '500px' }}>
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

            {/* Wheel and Spin button centered */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Wheel slots={timeSlots} rotationAngle={rotationAngle} spinning={spinning} />
                </div>
                <button
                    onClick={handleSpin}
                    disabled={spinning}
                    style={{
                        fontSize: '1.2rem',
                        padding: '0.6rem 1.2rem',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        backgroundColor: '#F87171',
                        color: '#fff',
                        border: 'none',
                        minWidth: '120px'
                    }}
                >
                    {spinning ? 'Spinning...' : 'Spin!'}
                </button>
            </div>

            <button onClick={handleBack} style={{ marginTop: '30px', fontSize: '1rem', padding: '0.5rem 1rem' }}>
                Back to Lobby
            </button>
        </div>
    );
}

export default SpinPage;

