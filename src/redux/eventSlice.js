import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    // For convenience, store events in an object keyed by eventId
    // Each event: { name, deadline, timeSlots: [], ...}
    events: {}
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        createEvent: {
            // Example usage: dispatch(createEvent({ name: 'My Event', deadline: 'Fri @5pm', timeSlots: [...] }))
            reducer: (state, action) => {
                const { eventId, name, deadline, timeSlots } = action.payload;
                state.events[eventId] = {
                    name,
                    deadline,
                    timeSlots
                };
            },
            // "prepare" callback to auto-generate an eventId
            prepare: ({ name, deadline, timeSlots = [] }) => {
                const eventId = nanoid(); // generate unique ID
                return {
                    payload: { eventId, name, deadline, timeSlots }
                };
            }
        },
        updateEvent: (state, action) => {
            // Example usage: dispatch(updateEvent({ eventId, name: 'New name', deadline: 'New time' }))
            const { eventId, name, deadline, timeSlots } = action.payload;
            if (state.events[eventId]) {
                if (name !== undefined) state.events[eventId].name = name;
                if (deadline !== undefined) state.events[eventId].deadline = deadline;
                if (timeSlots !== undefined) state.events[eventId].timeSlots = timeSlots;
            }
        },
        removeEvent: (state, action) => {
            // Example usage: dispatch(removeEvent(eventId))
            const eventId = action.payload;
            delete state.events[eventId];
        },
        spinWheel: (state, action) => {
            const {eventId} = action.payload;
            const event = state.events[eventId];
            if (!event) return;

            const totalChips = event.timeSlots.reduce((sum, slot) => sum + slot.chips, 0);
        }
    }
});

export const { createEvent, updateEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
