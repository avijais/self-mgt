import React, { useState } from 'react';
import SelfMgtDashboard from './self-mgt/views/SelfMgtDashboard';
import UserDashboard from './user-crud/views/UserDashboard';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SelfMgtDashboard/>} />
      <Route path="/user-mgt" element={<UserDashboard/>} />
    </Routes>
  );
}

export default App;