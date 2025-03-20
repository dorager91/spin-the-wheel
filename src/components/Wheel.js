import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import '../styles/wheel.css';

const Wheel = () => {
    const slots = useSelector(state => state.slots.timeSlots);

    const totalChips = useMemo(() => {
        return slots.reduce((sum, s) => sum + s.chips, 0);
    }, [slots]);

    const gradientString = useMemo(() => {
        let currentAngle = 0;
        const segments = [];

        const colorPalette = [
            '#FF6363', '#FFA600', '#FFBD69', '#58508D', '#BC5090',
            '#34D399', '#60A5FA', '#A78BFA', '#F87171', '#FBBF24'
        ];


        console.log("=== Building conic gradient ===");
        console.log("Total Chips:", totalChips);

        slots.forEach((slot, i) => {
            // Avoid divide-by-zero
            const sliceAngle = totalChips > 0
                ? (slot.chips / totalChips) * 360
                : (1 / slots.length) * 360;

            const nextAngle = currentAngle + sliceAngle;
            const color = colorPalette[i % colorPalette.length];
            segments.push(`${color} ${currentAngle}deg ${nextAngle}deg`);
            currentAngle = nextAngle;
        });

        // If you want the final segment to fill up to 360, ensure last angle ~ 360 deg
        // Or you can let the sum of slices be exactly 360 if totalChips is correct.
        return `conic-gradient(from 0deg, ${segments.join(', ')})`;
    }, [slots, totalChips]);

    return (
        <div className="wheel-container">
            <div className="wheel" style={{ background: gradientString }}>
                {/* Optionally place a pointer or text */}
            </div>
        </div>
    );
};

export default Wheel;
