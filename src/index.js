import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Votes from './routes/votes';
import Teamup from './routes/Teamup';
import Home from './routes/Home';
import Views from './routes/views';
import Queries from './routes/Query';
import Member from './routes/Member';
import Schedule from './routes/Schedule';
import Tinder from './routes/Tinder';
import Login from './routes/Login';
import rootReducer from "./reducers";
import RouteUI from "./containers/RouteUIContainer"
import { configureStore } from '@reduxjs/toolkit';
/*global google*/

const store = configureStore({ //建立store
  reducer: rootReducer,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Home" element={<Home />} />
        <Route path="Teamup" element={<Teamup />} />
        <Route path="Votes" element={<Votes />} />
        <Route path="queries" element={<Queries />} />
        <Route path="views" element={<Views />} />
        <Route path="Schedule" element={<Schedule />} />
        <Route path="Member" element={<Member />} />
        <Route path="Tinder" element={<Tinder />} />
        <Route path="c" element={<RouteUI />} />
      </Routes>
    </BrowserRouter></Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
