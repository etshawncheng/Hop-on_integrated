import TopNav from '../components/topNav';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const url = 'http://localhost:5000/api';
function submit(e, setId) {
  e.preventDefault();
  const account = document.getElementById("account").value;
  const password = document.getElementById("password").value;
  // console.debug(e.target);
  // return;
  fetch(url
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }, body: JSON.stringify({ type: "python", query: ["verify_account.py", account, password] })
      // ,
      // signal: controller.signal
    }).then((response) => {
      if (response.status !== 200) throw Error('http failed!');
      return response.text();
    }).then((raw) => {
      if (!raw) throw Error('no data!');
      const parsed = JSON.parse(raw);
      if (!parsed) throw Error('wrong data format!');
      console.debug(parsed["data"]);

      setId(parsed["data"]);
    }).catch((reason) => {
      console.error(reason);
    }).finally(() => {
    });
}
function Login() {
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  useEffect(() => {
    if (id) {
      if (id != -1) {
        setCookie("user_id", id, {path:"/", maxAge:24*60*60});
        navigate("/Member");
      } else {
        alert("wrong account or password!")
      }
    }
  }, [id]);
  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
          <h2 className="text-center mb-4 text-primary">Login Form</h2>
          <form onSubmit={e => submit(e, setId)}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="text" className="form-control border border-primary" id="account" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control border border-primary" id="password"></input>
            </div>
            <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </form>
          <div className="mt-3">
            <p className="mb-0  text-center">Don't have an account? <a href="signup.html" className="text-primary fw-bold">Sign Up</a></p>
          </div>
        </div>
      </div>
    </main>
  )
};
export default Login;