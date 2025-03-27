// src/pages/SpinPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Wheel from '../components/Wheel';
import { spinWheel } from '../redux/eventSlice';

function SpinPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [spinning, setSpinning] = useState(false);
    const event = useSelector(state => state.events.events[eventId]) || null;

    // a conditional return
    if (!event) {
        return <div>No event found with ID: {eventId}</div>;
    }

    const { name, deadline, timeSlots, winner } = event;

    const handleSpin = () => {
        dispatch(spinWheel({ eventId }));
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
            navigate(`/winner/${eventId}`);
        }, 3000);
    };

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Spin the Wheel to View the Winner!</h2>
            <p>
                <strong>Event ID:</strong> {eventId} <br/>
                <strong>Event Name:</strong> {name} <br/>
                <strong>Deadline:</strong> {deadline}
            </p>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div>
                    <Wheel slots={timeSlots} spinning={spinning} />
                </div>
                <div>
                    <button onClick={handleSpin} disabled={spinning}>
                        {spinning ? 'Spinning...' : 'Spin!'}
                    </button>
                </div>
            </div>

            <button onClick={handleBack} style={{ marginTop: '20px' }}>
                Back to Lobby
            </button>
        </div>
    );
}

export default SpinPage;
