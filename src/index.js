import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Votes, Teamup, Home, Views, Queries, Tinder, Login, Schedule,  Signup  } from './routes/index';
import Member from './containers/MemberContainer';
import rootReducer from "./reducers";
import RouteUI from "./containers/RouteUIContainer"
import { configureStore } from '@reduxjs/toolkit';
import Advanced from './components/Advanced';

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
        <Route path="Vote" element={<Votes />} />
        <Route path="Query" element={<Queries />} />
        <Route path="View" element={<Views />} />
        <Route path="Schedule" element={<RouteUI />} />
        <Route path="Member" element={<Member />} />
        <Route path="Tinder" element={<Tinder />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter></Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
