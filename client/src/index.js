import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import UserLoginStore from './Context/UserLoginStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
  
      <UserLoginStore>
        <App />
      </UserLoginStore>

  </BrowserRouter>
  // </React.StrictMode>,

);

reportWebVitals();