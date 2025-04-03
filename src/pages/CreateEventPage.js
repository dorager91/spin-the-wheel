import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Wheel from '../components/Wheel';
import { createEvent } from '../redux/eventSlice';
import '../styles/createEvent.css';

function CreateEventPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [eventName, setEventName] = useState('');
    const [chipsAvailable, setChipsAvailable] = useState('');
    const [deadline, setDeadline] = useState('');

    const [newSlotDate, setNewSlotDate] = useState('');
    const [newSlotTime, setNewSlotTime] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

    // Shared color palette for new slots
    const colorPalette = [
        '#FF6363', '#FFA600', '#FFBD69', '#58508D', '#BC5090',
        '#34D399', '#60A5FA', '#A78BFA', '#F87171', '#FBBF24'
    ];

    const handleAddSlot = () => {
        if (!newSlotDate || !newSlotTime) return;
        const label = `${newSlotDate} ${newSlotTime}`;
        const color = colorPalette[timeSlots.length % colorPalette.length];
        setTimeSlots([...timeSlots, { label, chips: 0, color }]);
        setNewSlotDate('');
        setNewSlotTime('');
    };

    const handleGenerateEvent = () => {
        const chipsNum = parseInt(chipsAvailable, 10) || 0;
        const actionResult = dispatch(createEvent({
            name: eventName,
            chips: chipsNum,
            deadline,
            timeSlots
        }));
        const { eventId } = actionResult.payload;
        navigate(`/bet/${eventId}`);
    };

    const handleBack = () => {
        navigate('/organizer-tasks');
    };

    return (
        <div className="create-event-container">
            <div className="left-panel">
                <h2 className="create-event-title">Make a New Event</h2>
                <div className="form-group">
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Stickers Available:</label>
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
                        placeholder="eg. MM/DD 10PM"
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
                            className="date-input"
                        />
                        <input
                            type="text"
                            placeholder="eg. 1pm"
                            value={newSlotTime}
                            onChange={(e) => setNewSlotTime(e.target.value)}
                            className="time-input"
                        />
                        <button onClick={handleAddSlot}>Add Time</button>
                    </div>
                    <ul>
                        {timeSlots.map((slot, idx) => (
                            <li key={idx}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: slot.color,
                                        marginRight: '8px'
                                    }}
                                />
                                {slot.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="buttons-row">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="generate-event-button" onClick={handleGenerateEvent}>
                        Generate Event ID
                    </button>
                </div>
            </div>

            <div className="right-panel">
                <h3 className="wheel-preview-title">Preview Wheel</h3>
                <Wheel slots={timeSlots} />
            </div>
        </div>
    );
}

export default CreateEventPage;
