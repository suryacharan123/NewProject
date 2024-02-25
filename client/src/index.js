import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import UserLoginStore from './Context/UserLoginStore';
// import { Provider } from 'react-redux';
// import {store} from './Redux/Store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Provider store={store}> */}
      <UserLoginStore>
        <App />
      </UserLoginStore>
    {/* </Provider> */}
  </BrowserRouter>
  // </React.StrictMode>,

);

reportWebVitals();