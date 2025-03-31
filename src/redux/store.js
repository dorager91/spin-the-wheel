import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import slotsReducer from './slotsSlice';
import eventsReducer from './eventSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['events']
};

const rootReducer = combineReducers({
    events: eventsReducer,
});
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
