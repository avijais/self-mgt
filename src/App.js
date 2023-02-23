import React, { useState } from 'react';
import SelfMgtDashboard from './self-mgt/views/SelfMgtDashboard';
import UserDashboard from './user-crud/views/UserDashboard';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SelfMgtDashboard/>} />
        <Route path="/user-mgt" element={<UserDashboard/>} />
      </Routes>
    </>
  );
}

export default App;