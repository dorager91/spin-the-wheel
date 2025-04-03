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

    const parseDeadline = (deadlineStr) => {
        if (!deadlineStr) return null;
      
        let parts = deadlineStr.trim().split(" ");
        const datePart = parts[0];
        let timePartOriginal = parts[1] || "12am";
      
        let periodMatch = timePartOriginal.match(/(am|pm)$/i);
        let period = "";
        let timePart = timePartOriginal;
        if (!periodMatch) {
            period = 'am';
        } else {
            period = periodMatch[0].toLowerCase();
            timePart = timePart.replace(/(am|pm)$/i, '').trim();
        }
      
        let hour, minute = 0;
        if (timePart.includes(":")) {
            const [h, m] = timePart.split(":");
            hour = parseInt(h, 10);
            minute = parseInt(m, 10);
        } else {
            hour = parseInt(timePart, 10);
        }
        if (isNaN(hour)) return null;
        
        if (period === 'pm' && hour < 12) {
            hour += 12;
        }
        if (period === 'am' && hour === 12) {
            hour = 0;
        }
        
        const dateParts = datePart.split("/");
        if (dateParts.length !== 2) return null;
        const month = parseInt(dateParts[0], 10);
        const day = parseInt(dateParts[1], 10);
        if (isNaN(month) || isNaN(day)) return null;
        
        const currentYear = new Date().getFullYear();
        return new Date(currentYear, month - 1, day, hour, minute);
    };

    const handleSpin = () => {
        const deadlineTime = parseDeadline(deadline);
        const now = new Date();
        if (now < deadlineTime) {
            const confirmed = window.confirm("The deadline has not elapsed yet. Are you sure you want to spin the wheel anyway?");
            if (!confirmed) {
                return;
            }
        }

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
      
        const fullSpins = 10;
        const totalChips = slots.reduce((sum, s) => sum + s.chips, 0);
        if (totalChips === 0) return 0;

        let currentAngle = 0;
        let chosenSlotStart = 0;
        let chosenSlotEnd = 0;

        for (let slot of slots) {
            const sliceAngle = (slot.chips / totalChips) * 360;
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
