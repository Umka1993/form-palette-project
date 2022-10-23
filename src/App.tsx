import React from 'react';
import './assets/styles/main.css';
import { Page } from './page/Page';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <Page />
      </div>
    </div>
  );
};
