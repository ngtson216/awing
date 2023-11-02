import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import './App.css';
import ROUTER from './routes';
import Campaign from './screens/Campaign';

function App() {
  return (
    <div>
      <Routes>
        <Route path={ROUTER.INDEX} element={<Campaign />} />
      </Routes>
    </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
