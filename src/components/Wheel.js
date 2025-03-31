// Wheel.js
import React, { useMemo } from 'react';
import '../styles/wheel.css';

const Wheel = ({ slots, rotationAngle = 0 }) => {
    const totalChips = useMemo(() => {
        return slots.reduce((sum, s) => sum + (s.chips || 0), 0);
    }, [slots]);

    const gradientString = useMemo(() => {
        if (slots.length === 0) {
            return 'none';
        }

        let currentAngle = 0;
        const segments = [];

        slots.forEach((slot) => {
            const sliceAngle = totalChips > 0
                ? (slot.chips / totalChips) * 360
                : (1 / slots.length) * 360;

            const nextAngle = currentAngle + sliceAngle;
            // use slot.color
            const color = slot.color || '#ccc'; // fallback if none
            segments.push(`${color} ${currentAngle}deg ${nextAngle}deg`);
            currentAngle = nextAngle;
        });

        return `conic-gradient(from 0deg, ${segments.join(', ')})`;
    }, [slots, totalChips]);

    return (
        <div className="wheel-container">
            <div className="pointer"> ▼ </div>
            <div className="wheel" style={{ background: gradientString, transform: `rotate(${rotationAngle}deg)` }}>
                {slots.length === 0 && <p>No timeslots yet</p>}
            </div>
        </div>
    );
};

export default Wheel;

