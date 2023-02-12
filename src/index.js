import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Crud from './user-crud/Crud';
import ExpDashboard from './exp-mgt/ExpDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* expense mgt dashboard */}
    <ExpDashboard/>

    {/* <Crud /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
