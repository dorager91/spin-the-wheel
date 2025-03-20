import { configureStore } from '@reduxjs/toolkit';
import slotsReducer from './slotsSlice';

export const store = configureStore({
    reducer: {
        slots: slotsReducer
    }
});
