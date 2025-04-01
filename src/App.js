import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import CreateEventPage from './pages/CreateEventPage';
import LobbyPage from './pages/LobbyPage';
import BetPage from './pages/BetPage';
import SpinPage from './pages/SpinPage';
import WinnerPage from './pages/WinnerPage';
import EnterEventID from './pages/EnterEventID';
import OrganizerSelectTaskPage from './pages/OrganizerSelectTaskPage';

function App() {
    return (
        <Router basename="/spin-the-wheel">
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/enter-event" element={<EnterEventID />} />
                <Route path="/organizer-tasks" element={<OrganizerSelectTaskPage />} />
                <Route path="/create" element={<CreateEventPage />} />
                <Route path="/lobby/:eventId" element={<LobbyPage />} />
                <Route path="/bet/:eventId" element={<BetPage />} />
                <Route path="/spin/:eventId" element={<SpinPage />} />
                <Route path="/winner/:eventId" element={<WinnerPage />} />
            </Routes>
        </Router>
    );
}

export default App;
