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
        },
        spinWheel: (state, action) => {
            // payload = { eventId }
            const { eventId } = action.payload;
            const event = state.events[eventId];
            if (!event) return;

            // Weighted random selection
            const totalStickers = event.timeSlots.reduce((sum, s) => sum + s.chips, 0);
            if (totalStickers === 0) {
                event.winner = null;
                return;
            }

            const rand = Math.random() * totalStickers;
            let cumulative = 0;
            let chosenSlot = null;
            for (let slot of event.timeSlots) {
                cumulative += slot.chips;
                if (rand <= cumulative) {
                    chosenSlot = slot;
                    break;
                }
            }
            // store winner in event
            event.winner = chosenSlot; // e.g. { id, label, color, chips }
        }
    }
});

export const { createEvent, addChipToSlot } = eventsSlice.actions;
export default eventsSlice.reducer;
