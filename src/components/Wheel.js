// src/components/Wheel.js
import React, { useMemo } from 'react';
import '../styles/wheel.css';
import SVGHighlightArc from './SVGHighlightArc';

const Wheel = ({ slots, rotationAngle = 0, highlightedSlotId, spinning = false, winningSlotId }) => {
    const totalChips = useMemo(() => {
        return slots.reduce((sum, s) => sum + (s.chips || 0), 0);
    }, [slots]);

    const gradientString = useMemo(() => {
        if (slots.length === 0) return 'none';

        let currentAngle = 0;
        const segments = [];
        slots.forEach((slot) => {
            const sliceAngle = totalChips > 0
                ? (slot.chips / totalChips) * 360
                : (1 / slots.length) * 360;
            const nextAngle = currentAngle + sliceAngle;
            segments.push(`${slot.color} ${currentAngle}deg ${nextAngle}deg`);
            currentAngle = nextAngle;
        });

        return `conic-gradient(from 0deg, ${segments.join(', ')})`;
    }, [slots, totalChips]);

    const wheelStyle = {
        background: gradientString,
        transform: `rotate(${rotationAngle}deg)`
    };
    const winningAngles = useMemo(() => {
        if (!winningSlotId) return null;
        let currentAngle = 0;
        let winningStart = 0, winningEnd = 0;
        for (let slot of slots) {
            const sliceAngle =
                totalChips > 0
                    ? (slot.chips / totalChips) * 360
                    : (1 / slots.length) * 360;
            const slotStart = currentAngle;
            const slotEnd = currentAngle + sliceAngle;
            if (slot.id === winningSlotId) {
                winningStart = slotStart;
                winningEnd = slotEnd;
                break;
            }
            currentAngle += sliceAngle;
        }
        return { winningStart, winningEnd };
      }, [winningSlotId, slots, totalChips]);

    return (
        <div className="wheel-container">
            <div className="pointer"> ▼ </div>
            <div
                className={`wheel ${spinning ? 'spinning' : ''}`}
                style={wheelStyle}
                data-highlighted-slot={highlightedSlotId}
            >
                {slots.length === 0 && <p>No timeslots yet</p>}
                {winningSlotId && winningAngles && (<SVGHighlightArc startAngle={winningAngles.winningStart} endAngle={winningAngles.winningEnd} />)}
            </div>
        </div>
    );
};

export default Wheel;
