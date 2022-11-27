import { AiOutlineSearch, AiOutlineSend, AiOutlineDown } from 'react-icons/ai'
import Video from './assets/trip start video.mp4'
import './Teamup.css'
import TopNav from '../components/topNav';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import e from 'cors';
const url = "http://localhost:5000/api"
function addGuest(e, guestList, setGuestList) {
  const L = guestList.map(x => x);
  L.push("email:");
  console.debug(L);
  setGuestList(L);
}
function Guest(value, i, guestList, setGuestList) {
  return <>
    <input type="text" value={value}
      onChange={e => {
        const L = guestList.map(x => x);
        L[i] = e.target.value;
        setGuestList(L);
      }}
    /><button type="button" onClick={e => {
      guestList.length != 1 ? setGuestList(guestList.splice(i, 1)) : setGuestList([])
    }}>remove</button>
  </>
}
function Teamup() {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [guestList, setGuestList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // const controller = new AbortController();
    console.debug(guestList);
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
  }, [loading, regions, err, start, end, guestList]);
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
                <h1 class="form-label">Choose destination (city)</h1>
                <div>
                  {regions ? regions.map(x =>
                    <div>
                      <input className="" id={x["REGION_ID"]} type="checkbox" value={x["REGION_ID"]} /><label className="">{x["FIRST_DISTRICT_NAME"]}</label>
                    </div>) : null}
                </div>
              </div>
              <h1>Start date:</h1>
              <input type="date" id="start" name="trip-start" value={start}
                onChange={e => {
                  const value = document.getElementById("start").value;
                  if (value < end) { setStart(value) }
                  else {
                    // alert()
                  }
                }}
              />
              <h1>End date:</h1>
              <input type="date" id="end" name="trip-end" value={end}
                onChange={e => {
                  const value = document.getElementById("end").value;
                  if (value > start) { setEnd(value) }
                  else {
                    // alert()
                  }
                }}
              />
              <div>
                <h1>Number of guests :</h1>
                <button type="button" className='btn btn-primary' value="add-tourmate"
                  onClick={e => {
                    addGuest(e, guestList, setGuestList);
                  }}>add tourmate</button>
                {guestList ? guestList.map((x, i) => Guest(x, i, guestList, setGuestList)) : null}
              </div>
              <h1>Are you ready?</h1>
              <div>
              </div>
              <div>
                <div class="mb-3">
                  {/* <button class="btn btn-primary" href="#home" type="submit" onclick="myFunction()">Team up</button>    */}
                  <input class="btn btn-primary" type="submit" value="Team up"/>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </main>
  );
}
export default Teamup;