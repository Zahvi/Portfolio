import React from 'react';
import ReactDOM from 'react-dom/client';
import AppComponent from './App';
import './index.css'; // Ensure this file exists

console.log('index.jsx loaded'); // Debug
const RootElement = ReactDOM.createRoot(document.getElementById('root'));
console.log('Rendering AppComponent'); // Debug render
RootElement.render(<AppComponent />);