// src/redux/userSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    role: null, // 'organizer' or 'participant'
    userId: nanoid(), // a generated ID
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload; // payload should be 'organizer' or 'participant'
        },
    },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;
