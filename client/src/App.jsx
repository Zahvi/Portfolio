import React from 'react';
import LandingPageComponent from './sections/LandingPage';

console.log('App.jsx loaded'); // Add this line

function AppComponent()
{
    return (
        <div className="w-full h-full">
            <LandingPageComponent />
        </div>
    );
}

export default AppComponent;