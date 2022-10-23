import React from 'react';
import './assets/styles/main.css';
import { HomePage } from './homePage/HomePage';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <HomePage />
      </div>
    </div>
  );
};
