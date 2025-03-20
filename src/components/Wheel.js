import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spinWheel } from '../redux/slotsSlice';
import '../styles/wheel.css';

const Wheel = () => {
    const slots = useSelector(state => state.slots.timeSlots);
    const dispatch = useDispatch();
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleSpin = () => {
        dispatch(spinWheel());
        const newRotation = rotation + 360 * 3 + Math.floor(Math.random() * 360);
        setRotation(newRotation);
        setSpinning(true);

        setTimeout(() => {
            setSpinning(false);
        }, 3000);
    };

    return (
        <div className="wheel-container">
            <div
                className={`wheel ${spinning ? 'spinning' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {slots.map((slot, index) => (
                    <div key={slot.id} className="slice">
                        {slot.label} ({slot.chips})
                    </div>
                ))}
            </div>
            <button onClick={handleSpin}>Spin the Wheel!</button>
        </div>
    );
};

export default Wheel;
