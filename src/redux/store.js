import { configureStore } from '@reduxjs/toolkit';
// import slotsReducer from './slotsSlice';
import eventsReducer from './eventSlice';

export const store = configureStore({
    reducer: {
        // slots: slotsReducer,
        events: eventsReducer
    }
});
