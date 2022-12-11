import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import url from '../url';

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
export function Login() {
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  useEffect(() => {
    console.debug(id);
    if (cookies["user_id"] && cookies["user_id"] !== -1) {
      navigate("/Member");
    }
    if (id) {
      if (id !== -1) {
        setCookie("user_id", id, { path: "/", maxAge: 24 * 60 * 60 });
        navigate("/Member");
      } else {
        alert("wrong account or password!")
      }
    }
  }, [id]);
  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
          <h2 className="text-center mb-4 text-primary">登錄</h2>
          <form onSubmit={e => submit(e, setId)}>
            <div className="mb-3">
              <label className="form-label">電子郵件</label>
              <input type="text" className="form-control border border-primary" id="account" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">密碼</label>
              <input type="password" className="form-control border border-primary" id="password"></input>
            </div>
            <p className="small"><a className="text-primary" href="forget-password.html">忘記密碼</a></p>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">登錄</button>
            </div>
          </form>
          <div className="mt-3 col-flex">
            <p className="mb-0  text-center">還沒註冊帳號嗎?</p>
            <a href="\Signup" className="text-center fw-bold">註冊</a>
          </div>
        </div>
      </div>
    </main>
  )
};