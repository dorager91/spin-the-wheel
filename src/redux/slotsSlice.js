import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    timeSlots: [
        { id: 1, label: "Monday 9AM", chips: 2 },
        { id: 2, label: "Tuesday 10AM", chips: 4 },
        { id: 3, label: "Wednesday 11AM", chips: 3 },
        { id: 4, label: "Thursday 1PM", chips: 5 },
        { id: 5, label: "Friday 2PM", chips: 1 }
    ],
    winner: null
};

export const slotsSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {
        addChip: (state, action) => {
            const slot = state.timeSlots.find(slot => slot.id === action.payload);
            if (slot) slot.chips += 1;
        },
        spinWheel: (state) => {
            const totalChips = state.timeSlots.reduce((sum, slot) => sum + slot.chips, 0);
            const rand = Math.random() * totalChips;
            let cumulative = 0;
            for (let slot of state.timeSlots) {
                cumulative += slot.chips;
                if (rand <= cumulative) {
                    state.winner = slot;
                    break;
                }
            }
        },
        reset: (state) => {
            state.winner = null;
            state.timeSlots.forEach(slot => slot.chips = 0);
        }
    }
});

export const { addChip, spinWheel, reset } = slotsSlice.actions;

export default slotsSlice.reducer;
