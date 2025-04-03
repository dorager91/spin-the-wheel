// src/redux/eventsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    events: {}
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        createEvent: {
            reducer: (state, action) => {
                const { eventId, name, chips, deadline, timeSlots } = action.payload;
                state.events[eventId] = {
                    name,
                    chipsPerParticipant: chips,
                    deadline, // store as raw string
                    timeSlots, // array of objects { id, label, chips, color }
                    winner: null // no winner yet
                };
            },
            prepare: ({ name, chips, deadline, timeSlots }) => {
                const eventId = nanoid();
                const enrichedSlots = timeSlots.map(slot => ({
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
            const { eventId, slotId } = action.payload;
            const event = state.events[eventId];
            if (!event) return;
            const slot = event.timeSlots.find(s => s.id === slotId);
            if (slot) {
                slot.chips += 1;
            }
        },
        removeChipFromSlot: (state, action) => {
            const { eventId, slotId } = action.payload;
            const event = state.events[eventId];
            if (!event) return;
            const slot = event.timeSlots.find(s => s.id === slotId);
            if (slot && slot.chips > 0) {
                slot.chips -= 1;
            }
        },
        spinWheel: (state, action) => {
            const { eventId } = action.payload;
            const event = state.events[eventId];
            if (!event) return;

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
            // Store the entire slot as the winner
            event.winner = chosenSlot;
        }
    }
});

export const { createEvent, addChipToSlot, removeChipFromSlot, spinWheel } = eventsSlice.actions;
export default eventsSlice.reducer;
