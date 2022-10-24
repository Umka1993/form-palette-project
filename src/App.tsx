import React from 'react';
import './assets/styles/main.css';
import { HomePage } from './homePage/HomePage';
import { BrowserRouter } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <HomePage />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};
