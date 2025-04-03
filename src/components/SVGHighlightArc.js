import React from 'react';

const SVGHighlightArc = ({ startAngle, endAngle }) => {
    const center = 150;
    const radius = 145;
    const strokeWidth = 10;

    const toRad = (deg) => ((deg - 90) * Math.PI) / 180;

    const startX = center + radius * Math.cos(toRad(startAngle));
    const startY = center + radius * Math.sin(toRad(startAngle));
    const endX = center + radius * Math.cos(toRad(endAngle));
    const endY = center + radius * Math.sin(toRad(endAngle));

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const pathData = `
        M ${center} ${center}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
    `;

    return (
        <svg width="300" height="300" style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur">
                    <animate 
                        attributeName="stdDeviation" 
                        values="6;18;6" 
                        dur="1.5s" 
                        repeatCount="indefinite" 
                    />
                </feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <path
            d={pathData}
            fill="none"
            stroke="gold"
            strokeWidth={strokeWidth}
            trokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow)"
        />
        </svg>
    );
};

export default SVGHighlightArc;