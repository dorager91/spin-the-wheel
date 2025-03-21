import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { createEvent } from '../redux/eventsSlice'; // if you have an eventsSlice
import { nanoid } from '@reduxjs/toolkit'; // if you need to generate an ID

function CreateEventPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form fields for the event
    const [eventName, setEventName] = useState('');
    const [chipsAvailable, setChipsAvailable] = useState('');
    const [deadline, setDeadline] = useState('');

    // For adding time slots
    const [newSlotDate, setNewSlotDate] = useState('');
    const [newSlotTime, setNewSlotTime] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

    // Handle adding a new slot to our list
    const handleAddSlot = () => {
        if (!newSlotDate || !newSlotTime) return;
        const label = `${newSlotDate} ${newSlotTime}`;
        setTimeSlots([...timeSlots, { label, chips: 1 }]);
        setNewSlotDate('');
        setNewSlotTime('');
    };

    // Generate a conic gradient so each timeslot is equally sized
    const gradientString = useMemo(() => {
        if (timeSlots.length === 0) {
            // No slots yet → just a single color or none
            return 'none';
        }

        let currentAngle = 0;
        const sliceAngle = 360 / timeSlots.length;
        const segments = [];
        const colorPalette = [
            '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA',
            '#F472B6', '#2DD4BF', '#FACC15', '#4ADE80'
        ];

        for (let i = 0; i < timeSlots.length; i++) {
            const nextAngle = currentAngle + sliceAngle;
            const color = colorPalette[i % colorPalette.length];
            segments.push(`${color} ${currentAngle}deg ${nextAngle}deg`);
            currentAngle = nextAngle;
        }

        return `conic-gradient(${segments.join(',')})`;
    }, [timeSlots]);

    // Handle final event creation
    const handleGenerateEvent = () => {
        // Example: dispatch to your eventsSlice or store
        const eventId = nanoid();
        /*
        dispatch(createEvent({
          name: eventName,
          deadline,
          chipsPerParticipant: parseInt(chipsAvailable, 10) || 0,
          timeSlots,
        }));
        */

        // For now, just navigate to the Lobby page with the new eventId
        navigate(`/lobby/${eventId}`);
    };

    const handleBack = () => {
        navigate('/organizer-tasks');
    };

    return (
        <div className="create-event-container">
            <div className="left-panel">
                <h2>Make a new event</h2>
                <div className="form-group">
                    <label>Event name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Stickers/Chips available:</label>
                    <input
                        type="number"
                        value={chipsAvailable}
                        onChange={(e) => setChipsAvailable(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Deadline:</label>
                    <input
                        type="text"
                        placeholder="MM/DD time"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <div className="time-slot-inputs">
                    <h4>Add a Time Slot</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="MM/DD"
                            value={newSlotDate}
                            onChange={(e) => setNewSlotDate(e.target.value)}
                            style={{ width: '100px', marginRight: '5px' }}
                        />
                        <input
                            type="text"
                            placeholder="Time e.g. 11am"
                            value={newSlotTime}
                            onChange={(e) => setNewSlotTime(e.target.value)}
                            style={{ width: '80px', marginRight: '5px' }}
                        />
                        <button onClick={handleAddSlot}>Add time</button>
                    </div>
                    <ul>
                        {timeSlots.map((slot, idx) => (
                            <li key={idx}>{slot.label}</li>
                        ))}
                    </ul>
                </div>

                <div className="buttons-row">
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleGenerateEvent}>Generate event ID</button>
                </div>
            </div>

            <div className="right-panel">
                <h3>Preview Wheel</h3>
                <div className="preview-wheel" style={{ background: gradientString }}>
                    {timeSlots.length === 0 && <p>No timeslots yet</p>}
                </div>
            </div>
        </div>
    );
}

export default CreateEventPage;
