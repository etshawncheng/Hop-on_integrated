
import { AiOutlineSearch, AiOutlineSend, AiOutlineDown } from 'react-icons/ai'
import Video from './assets/trip start video.mp4'
import './Teamup.css'
import TopNav from '../components/topNav';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const url = "http://localhost:5000/api"
function Teamup() {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  // const []
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // const controller = new AbortController();
    if (loading === false & regions === null) {
      setLoading(true);
      console.debug('fetching');
      fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "sql", query: `select * from project.region` })
          // ,
          // signal: controller.signal
        }
      ).then((response) => {
        if (response.status !== 200) throw Error('http failed!');
        return response.text();
      }).then((raw) => {
        // console.debug(raw);
        if (!raw) throw Error('no data!');
        const parsed = JSON.parse(raw);
        // console.debug(parsed);
        if (!parsed) throw Error('wrong data format!');
        setRegions(parsed["data"]);
        setErr(null);
      }).catch((reason) => {
        console.error(reason);
        setErr(reason);
      }).finally(() => {
        setLoading(false);
      });
    }
    // return () => {
    //     controller.abort();
    // }
  }, [loading, regions, err, start, end]);
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
                  {regions.map(x =>
                    <div>
                      <input className="" id={x["REGION_ID"]} type="checkbox" value={x["REGION_ID"]} /><label className="">{x["FIRST_DISTRICT_NAME"]}</label>
                    </div>)}
                </div>
              </div>
              <h1 for="start">Start date:</h1>
              <input type="date" id="start" name="trip-start" value={start}
                onChange={e => {
                  setStart(document.getElementById("start").value)
                }}
              />
              <h1 for="start">End date:</h1>
              <input type="date" id="end" name="trip-end" value={end}
                onChange={e => {
                  setEnd(document.getElementById("end").value)
                }}
              />
              <div>
                <h1>Number of guests :</h1>
                <input type="number" id="account" min="1" max="10" defaultValue="2">
                </input>
              </div>
              <h1>Are you ready?</h1>
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