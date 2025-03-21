import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addChip } from '../redux/slotsSlice';

function BetPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const slots = useSelector(state => state.slots.timeSlots);

    const handleAddChip = (slotId) => {
        dispatch(addChip(slotId));
    };

    const handleBack = () => {
        navigate(`/lobby/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Place Your Chips for Event: {eventId}</h2>
            {slots.map(slot => (
                <div key={slot.id} style={{ marginBottom: '10px' }}>
                    <strong>{slot.label}</strong> - Chips: {slot.chips}
                    <button onClick={() => handleAddChip(slot.id)}>+1 Chip</button>
                </div>
            ))}
            <button onClick={handleBack}>Back to Lobby</button>
        </div>
    );
}

export default BetPage;
