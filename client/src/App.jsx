import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageComponent from './pages/LandingPage';
import GamePage from './pages/GamePage/GamePage';

console.log('App.jsx loaded');

function AppComponent() {
    return (
        <Router>
            <div className="w-full h-full">
                <Routes>
                    {/* Default landing page */}
                    <Route path="/" element={<LandingPageComponent />} />

                    {/* Game page with dynamic id (e.g., /game/planet-protection) */}
                    <Route path="/game/:id" element={<GamePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppComponent;
