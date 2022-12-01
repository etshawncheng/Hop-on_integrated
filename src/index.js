import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Votes, Teamup, Home, Views, Queries, Member, Schedule, Tinder, Login } from './routes/index';
import rootReducer from "./reducers";
import RouteUI from "./containers/RouteUIContainer"
import { configureStore } from '@reduxjs/toolkit';

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
        <Route path="Schedule" element={<RouteUI />} />
        <Route path="Member" element={<Member />} />
        <Route path="Tinder" element={<Tinder />} />
        {/* <Route path="c" element={<RouteUI />} /> */}
      </Routes>
    </BrowserRouter></Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
