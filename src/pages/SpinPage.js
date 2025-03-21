import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wheel from '../components/Wheel';

function SpinPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const handleGoWinner = () => {
        navigate(`/winner/${eventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Spin the Wheel for Event: {eventId}</h2>
            <Wheel />
            <button onClick={handleGoWinner}>See Winner</button>
        </div>
    );
}

export default SpinPage;
