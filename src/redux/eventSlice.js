import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    events: {}
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        createEvent: {
            // action.payload = { name, chips, deadline, timeSlots }
            reducer: (state, action) => {
                const { eventId, name, chips, deadline, timeSlots } = action.payload;
                state.events[eventId] = {
                    name,
                    chipsPerParticipant: chips,
                    deadline,
                    timeSlots // array of objects { id, label, chips, color }
                };
            },
            // automatically generate eventId
            prepare: ({ name, chips, deadline, timeSlots }) => {
                const eventId = nanoid();
                // each timeslot gets an id & color if not assigned
                const enrichedSlots = timeSlots.map((slot) => ({
                    id: nanoid(),
                    label: slot.label,
                    chips: slot.chips || 0,
                    color: slot.color || '#ccc'
                }));

                return {
                    payload: {
                        eventId,
                        name,
                        chips,
                        deadline,
                        timeSlots: enrichedSlots
                    }
                };
            }
        },
        addChipToSlot: (state, action) => {
            // action.payload = { eventId, slotId }
            const { eventId, slotId } = action.payload;
            const event = state.events[eventId];
            if (!event) return; // invalid event
            const slot = event.timeSlots.find(s => s.id === slotId);
            if (slot) {
                slot.chips += 1;
            }
        }
    }
});

export const { createEvent, addChipToSlot } = eventsSlice.actions;
export default eventsSlice.reducer;
