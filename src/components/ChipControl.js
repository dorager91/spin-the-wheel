import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChip } from '../redux/slotsSlice';

const ChipControls = () => {
    const slots = useSelector(state => state.slots.timeSlots);
    const dispatch = useDispatch();

    return (
        <div className="chip-controls">
            <h2>Place Your Chips 🪙</h2>
            {slots.map(slot => (
                <div key={slot.id} className="chip-control">
                    <span>{slot.label}</span>
                    <button onClick={() => dispatch(addChip(slot.id))}>Add Chip</button>
                    <span>Chips: {slot.chips}</span>
                </div>
            ))}
        </div>
    );
};

export default ChipControls;
