import React from 'react';
import SelfMgtDashboard from './self-mgt/views/SelfMgtDashboard';
import UserDashboard from './user-crud/views/UserDashboard';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<UserDashboard/>} />
        <Route path="/self-mgt" element={<SelfMgtDashboard/>} />
      </Routes>
    </>
  );
}

export default App;