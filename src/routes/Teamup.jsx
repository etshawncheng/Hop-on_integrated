
import { AiOutlineSearch, AiOutlineSend, AiOutlineDown } from 'react-icons/ai'
import Video from './assets/trip start video.mp4'
import './Teamup.css'
import TopNav from '../components/topNav';
import { useState } from 'react';
import { useEffect } from 'react';

function Teamup() {
  const [regions, setRegions] = useState(null);
  useEffect(()=>{
    fetch
  },[]);
  return (
    <main style={{ padding: "1rem 0" }}>
      {TopNav("Team up")}
      <div className='Home'>
        <video autoPlay loop muted id='video'>
          <source src={Video} type='video/mp4' />
        </video>
        <center>
          <div className="content">
            <div name='book' className='search'>
              <div class="mb-3">
                <h1 for="exampleInputPassword1" class="form-label">Choose destination (city)</h1>
                <div>
                  <select className="form">
                    <option value="1">花蓮</option>
                    <option value="1">臺北</option>
                    <option value="1">臺中</option>
                    <option value="1">臺東</option>
                    <option value="1">臺南</option>
                    <option value="1">高雄</option>
                  </select>
                </div>
              </div>
              <h1 for="start">Start date:</h1>
              <input type="date" id="start" name="trip-start" value="2022-11-14">

              </input>

              <h1 for="start">End date:</h1>
              <input type="date" id="end" name="trip-end" value="2022-11-14">
              </input>
              <div>
                <h1 for="tentacles">Number of guests :</h1>
                <input type="number" id="tentacles" name="tentacles" min="1" max="100">
                </input>
                {/* q */}

              </div>
              <h1 for="tentacles">Are you ready?</h1>
              <div>

              </div>

              <div>
                <div class="mb-3">
                  {/* <button class="btn btn-primary" href="#home" type="submit" onclick="myFunction()">Team up</button>    */}
                  <a href="#Send" class="btn btn-primary" type="submit" >Team up</a>
                </div>
              </div>

            </div>
          </div>
        </center>

      </div>
      <div class="fixed-top text-center w-100">   </div>
      <div class="full-page" id="Send">
        <div class="vh-100 d-flex justify-content-center align-items-center ">
          <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
            <h2 class="text-center mb-4 text-primary">Guest Invitation (Sending URL)</h2>
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Guest Email address</label>
                <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              </div>

              <div class="d-grid">
                <button class="btn btn-primary" type="submit">Send</button>
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Guest Email address</label>
                <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              </div>

              <div class="d-grid">
                <button class="btn btn-primary" type="submit">Send</button>
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Guest Email address</label>
                <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              </div>

              <div class="d-grid">
                <button class="btn btn-primary" type="submit">Send</button>
              </div>
            </form>
            <div class="d-grid">
              <a class="btn " type="submit" href="#fill">
                <div>
                  <AiOutlineDown className='icon' href="#fill" >        </AiOutlineDown>
                </div>
                <div>
                  <AiOutlineDown className='icon' href="#fill" >        </AiOutlineDown>
                </div>
                <div>
                  <AiOutlineDown className='icon' href="#fill" >        </AiOutlineDown>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------- */}
      {/* <button class="btn btn-primary" type="submit" href="#fill">填問卷</button> */}

      {/* <a class="btn " type="submit" href="#fill"></a> */}
      <div class="full-page" id="fill">

        <div class="vh-100 d-flex justify-content-center align-items-center ">
          {/* align-items-center   顯示在中間 */}

          <div class="mb-3">
            {/* <button class="btn btn-primary" href="#home" type="submit" onclick="myFunction()">Team up</button>    */}
            <a href="#wait" class="btn btn-primary" type="submit" >進入等待</a>
          </div>
        </div>
        {/* <div class="d-grid" >
                <button class="btn btn-primary" type="submit" href="#wait">進入等待</button>
              </div> */}

      </div>

      <div class="full-page" id="wait">

        <div class="vh-100 d-flex justify-content-center align-items-center ">
          <div class="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
            <h2 class="text-center mb-4 text-primary">Team request (Waiting...)</h2>
            <form>

              <div class="d-grid" >
                <h2 >Guest 1 (Joined the Team ... )</h2>
                <h2>
                  <progress class="mb-3" value="100" max="100">Joined the Team</progress>
                </h2>
              </div>
              <div class="d-grid">
                <h2 >Guest 2 (Filling application ...)</h2>
                <h2>
                  <progress class="mb-3" value="50" max="100">Joined the Team</progress>
                </h2>
              </div>
              <div class="d-grid">
                <h2 >Guest 3 (Invited ... )</h2>
                <h2>
                  <progress class="mb-3" value="20" max="100">Joined the Team</progress>
                </h2>
              </div>
              <div class="d-grid">
                <a href="#Good" class="btn btn-primary" type="submit" >Go</a>
              </div>
            </form>
          </div>
        </div>
        <a href="#Good" class="btn btn-info">Good</a>
      </div>
      <div class="full-page" id="Good">
        Good
      </div>
    </main>
  );
}
export default Teamup;