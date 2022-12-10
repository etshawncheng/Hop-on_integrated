import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import url from '../url';

function submit(e, setSubmitted) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  
  const sex = [...document.getElementsByName("sex")].filter(x=>x.checked)[0].value;
  const birthDate = document.getElementById("birth-date").value;
  const email = document.getElementById("email").value;
  const account = document.getElementById("account").value;
  const password1 = document.getElementById("password-1").value;
  const password2 = document.getElementById("password-2").value;
  if (!(name && sex && birthDate && email && account && password1 && password2)) {
    setSubmitted("must fill all blank")
    return
  }
  if (password1 !== password2) {
    setSubmitted("different passwords")
    return
  }
  if (password1.length < 8) {
    setSubmitted("passwords not en")
    return
  }
  const q = ["insert_account.py", name, parseInt(sex), birthDate, email, account, password1]
  console.debug(q);
  // return;
  fetch(url
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }, body: JSON.stringify({ type: "python", query: q })
      // ,
      // signal: controller.signal
    }).then((response) => {
      if (response.status !== 200) throw Error('http failed!');
      return response.text();
    }).catch((reason) => setSubmitted(reason))
  setSubmitted(true)
}
export function Signup() {
  const [submited, setSubmitted] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [sex, setSex] = useState(1);
  useEffect(() => {
    if (submited) {
      if (submited === true) {
        alert("submit success")
      }
      // setCookie("user_id", id, { path: "/", maxAge: 24 * 60 * 60 });
      // navigate("/Member");
      alert(submited)
      setSubmitted(false)
    }

  }, [submited]);
  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
          <h2 className="text-center mb-4 text-primary">會員註冊</h2>
          <form onSubmit={e => submit(e, setSubmitted)}>
            <div className="mb-3">
              <label className="form-label">尊姓大名</label>
              <input type="text" className="form-control border border-primary" id="name"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">性別</label>
              <div className='col row-flex'>
                <input type="radio" className="" name="sex" value="1" />
                <label>男</label>
                <input type="radio" className="" name="sex" value="2" />
                <label>女</label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">電子郵件</label>
              <input type="email" className="form-control border border-primary" id="email"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">生日</label>
              <input type="date" className="form-control border border-primary" id="birth-date"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">帳戶名稱</label>
              <input type="text" className="form-control border border-primary" id="account"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">密碼</label>
              <input type="password" className="form-control border border-primary" id="password-1"></input>
            </div>
            <div className="mb-3">
              <label className="form-label">密碼</label>
              <input type="password" className="form-control border border-primary" id="password-2"></input>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
};