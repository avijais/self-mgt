import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDashboard from './user-mgt/views/UserDashboard';
// import Crud from './user-crud/Crud';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* expense mgt dashboard */}
    <UserDashboard/>

    {/* <Crud /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
