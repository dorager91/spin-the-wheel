import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../redux/eventSlice';
import { useNavigate } from 'react-router-dom';

function CreateEventPage() {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 1) Dispatch createEvent
        const actionResult = dispatch(createEvent({ name, deadline, timeSlots: [] }));
        // actionResult.payload => { eventId, name, deadline, timeSlots }

        // 2) Extract the new eventId
        const newEventId = actionResult.payload.eventId;
        // 3) Navigate to the new event's lobby page
        navigate(`/lobby/${newEventId}`);
    };

    return (
        <div style={{ margin: '50px' }}>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name: </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Deadline: </label>
                    <input value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateEventPage;
