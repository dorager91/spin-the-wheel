// src/pages/SpinPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Wheel from '../components/Wheel';
import { spinWheel } from '../redux/eventSlice';
import '../styles/spinPage.css';

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


    const handleSpin = () => {
        dispatch(spinWheel({ eventId }));
        const updatedEvent = store.getState().events.events[eventId];

        const finalAngle = computeSpinAngle(updatedEvent.timeSlots, updatedEvent.winner);
        setRotationAngle(finalAngle);
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
            navigate(`/winner/${eventId}`, { state: { finalAngle } });
        }, 3000);
    };

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
    


    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (

        <div className="spin-page-container">
            <h2 className="spin-page-title">Time to SPIN THE WHEEL!</h2>
            <p className="spin-page-info">
                <strong>Event ID:</strong> {eventId} <br />
                <strong>Event Name:</strong> {name} <br />
                <strong>Deadline:</strong> {deadline}
            </p>


            <div className="spin-content">
                <div className="wheel-wrapper">

                    <Wheel slots={timeSlots} rotationAngle={rotationAngle} spinning={spinning} />
                </div>
                <button
                    className="spin-button"
                    onClick={handleSpin}
                    disabled={spinning}
                >
                    {spinning ? 'Spinning...' : 'Spin!'}
                </button>
            </div>


            <button className="back-button" onClick={handleBack}>
                Back to Lobby
            </button>
        </div>
    );
}

export default SpinPage;

