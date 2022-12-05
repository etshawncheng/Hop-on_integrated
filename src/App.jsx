import React from 'react';
import Nav from 'react-bootstrap/Nav';
// import React, { useState } from 'react'
import { BsPerson } from 'react-icons/bs';
import Video from './Sunrise - 74704.mp4'
import { AiOutlineSearch, AiOutlineSend } from 'react-icons/ai'
// import"bootswatch/dist/flatly/bootstrap.min.css"
// import './App.css'

//npm install react-scripts@latest

const App = () => (
  <main style={{ padding: "1rem 0" }}>

  <Nav defaultActiveKey="/" as="ul">

    {/* <div className="logo"> */}
      <h2>Hop On</h2>
    {/* </div> */}
     <div className="header">
       {/* <div class="navitem"> */}

       <Nav.Item as="li">
         <Nav.Link href="/Home">首頁</Nav.Link>
       </Nav.Item>
       <h2 >l</h2>
       <Nav.Item as="li">
         <Nav.Link href="/Teamup">組隊</Nav.Link>
       </Nav.Item>
       <h2 >l</h2>
       <Nav.Item as="li">
         <Nav.Link href="/Votes">投票</Nav.Link>
       </Nav.Item>
       <h2 >l</h2>
       <Nav.Item as="li">
         <Nav.Link href="/views">景點</Nav.Link>
       </Nav.Item>
       <h2 >l</h2>
       <Nav.Item as="li">
         <Nav.Link href="/Schedule">行程</Nav.Link>
       </Nav.Item>
       <h2 >l</h2>
       {/* <div className="nav-icons"> */}
       <Nav.Item as="li">
         <Nav.Link href="/Member">
           <BsPerson className='icon' herf="/Member" smooth={true} duration={500} ></BsPerson>
         </Nav.Link>
       </Nav.Item>
       {/* </div> */}

       {/* </div> */}

  </div>

      {/* ----------------------------------------------------------------------------------- */}
      <div class="vh-100 d-flex justify-content-center align-items-center ">
        <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
            <h2 class="text-center mb-4 text-primary">登入</h2>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">信箱</label>
                        <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">密碼</label>
                        <input type="password" class="form-control border border-primary" id="exampleInputPassword1"></input>
                    </div>
                    <p class="small"><a class="text-primary" href="forget-password.html">忘記密碼?</a></p>
                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">登入</button>
                    </div>
                </form>
                <div class="mt-3">
                    <p class="mb-0  text-center">沒有帳號嗎? <a href="signup.html"
                            class="text-primary fw-bold">註冊</a></p>
                </div>
            </div>
    </div>

        
     
   </Nav>
   </main>

);

//-----------------------------------------------------------------------------------

  // <div class="vh-100 d-flex justify-content-center align-items-center ">
  //           <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
  //               <h2 class="text-center mb-4 text-primary">Login Form</h2>
  //               <form>
  //                   <div class="mb-3">
  //                       <label for="exampleInputEmail1" class="form-label">Email address</label>
  //                       <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
  //                   </div>
  //                   <div class="mb-3">
  //                       <label for="exampleInputPassword1" class="form-label">Password</label>
  //                       <input type="password" class="form-control border border-primary" id="exampleInputPassword1"></input>
  //                   </div>
  //                   <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
  //                   <div class="d-grid">
  //                       <button class="btn btn-primary" type="submit">Login</button>
  //                   </div>
  //               </form>
  //               <div class="mt-3">
  //                   <p class="mb-0  text-center">Don't have an account? <a href="signup.html"
  //                           class="text-primary fw-bold">Sign
  //                           Up</a></p>
  //               </div>
  //           </div>
  //   </div>



export default App;
