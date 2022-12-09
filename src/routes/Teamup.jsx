import Video from './assets/trip start video.mp4'
import './Teamup.css'
import TopNav from '../components/topNav';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import url from '../url';
import emailjs from 'emailjs-com';
import Alert from 'react-bootstrap/Alert';

function addGuest(e, guestList, setGuestList) {
  const L = guestList.map(x => x);
  L.push("");
  console.debug(L);
  setGuestList(L);
}
function Guest(value, i, guestList, setGuestList) {
  return (
    <form name="email-form">
      <input type="email" name="to_email" placeholder='email:' value={value}
        onChange={e => {
          const L = guestList.map(x => x);
          L[i] = e.target.value;
          setGuestList(L);
        }}
      />
      <input type="hidden" name="to_name" value={"1"} />
      <input type="hidden" name="to_reply" value={"1"} />
      <input type="hidden" name="message" value={"1"} />
      <button type="button" className='btn btn-primary' onClick={e => {
        guestList.length !== 1 ? setGuestList(guestList.splice(i, 1)) : setGuestList([])
      }}>remove</button>
    </form>)
}
function submit(e, cookies, setSubmitted) {
  e.preventDefault();
  // console.debug(e.target);
  // return;
  const region = [];
  const grouper_id = cookies["user_id"];
  let start_date = null;
  let period = null;
  let people_count = 0;
  const join_url = `concat(last_insert_id()+1,"c",${grouper_id})`;
  for (let i = 0; i < e.target.length; i++) {
    switch (e.target[i].type) {
      case "checkbox": {
        if (e.target[i].checked) {
          region.push(e.target[i].value);
        }
        break;
      }
      case "date": {
        if (e.target[i].id === "start") {
          start_date = e.target[i].value;
        } else if (e.target[i].id === "end") {
          period = (new Date(e.target[i].value) - new Date(start_date)) / (1000 * 60 * 60 * 24);
          if (period < 1) {

            setSubmitted("not valid start date or end date!")
            return
          }
        }
        break;
      }
      case "email": {
        people_count += 1;
        break;
      }
      default: {
        console.debug(e.target[0].value);
        break;
      }
    }
  }
  const region_list = region.join(" ");
  if (!region_list) {
    setSubmitted("must select at least one region!");
    return;
  }
  const q = `INSERT INTO project.team(region_list,start_date,period,people_count,join_url,set_time,grouper_id,teammate_list)VALUES("${region_list}","${start_date}",${period},${people_count},${join_url},now(),${grouper_id},"[]")`;
  console.debug(q);
  setSubmitted(true);
  return;
  fetch(url
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }, body: JSON.stringify({ type: "sql", query: q })
      // ,
      // signal: controller.signal
    }).then((response) => {
      if (response.status !== 200) throw Error('http failed!');
      setSubmitted(true);
    }).catch((reason) => {
      console.error(reason);
      setSubmitted(reason);
    });
}
export function Teamup() {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [guestList, setGuestList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [alerted, setAlerted] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [submited, setSubmitted] = useState(false);
  useEffect(() => {
    console.debug("eff")
    if (submited) {
      if (submited === true) {
        // if (process.env.REACT_APP_EMAIL_API_KEY) {
        //   const q = `select team_id from project.team where grouper_id=${cookies["user_id"]} and set_time=(select max(set_time) from project.team)`;
        //   fetch(url
        //     , {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //       }, body: JSON.stringify({ type: "sql", query: q })
        //       // ,
        //       // signal: controller.signal
        //     }).then((response) => {
        //       if (response.status !== 200) throw Error('http failed!');
        //       return response.text();
        //     }).then((raw) => {
        //       // console.debug(raw);
        //       if (!raw) throw Error('no data!');
        //       const parsed = JSON.parse(raw);
        //       // console.debug(parsed);
        //       if (!parsed) throw Error('wrong data format!');
        //       const team_id = parsed["data"]["team_id"];
        //       setCookie("team_id", team_id, { path: "/", maxAge: 24 * 60 * 60 });
        //       // const forms = document.getElementsByName("email-form");
        //       // forms.forEach(e => {
        //       //   console.debug(e);
        //       //   emailjs.sendForm('service_3qvcxup', 'template_1', e, process.env.REACT_APP_EMAIL_API_KEY)
        //       //     .then((result) => {
        //       //       console.log(result.text);
        //       //     }, (error) => {
        //       //       console.log(error.text);
        //       //     });
        //       // });
        //       console.debug(parsed);
        //     }).catch((reason) => {
        //       console.error(reason);
        //       setSubmitted(reason);
        //     });
        alert("submit success")
        navigate("/Query");
        // }
        setSubmitted(false)

      }
      else {
        alert(submited)
        setSubmitted(false)
      }
    }
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
  }, [loading, regions, err, start, end, guestList, submited]);
  return (
    <main style={{ padding: "1rem 0" }}>
      {TopNav("Team up")}
      <div className='Home'>
        <video autoPlay loop muted id='video'>
          <source src={Video} type='video/mp4' />
        </video>
        <center>
          <div className="content">
            <form onSubmit={e => { console.debug("submit?"); submit(e, cookies, setSubmitted) }}>
              <div className="mb-3">
                <h1 className="form-label">Choose destination (city)</h1>
                <div>
                  {regions ? regions.map(x =>
                    <div>
                      <input className="region" key={x["REGION_ID"]} type="checkbox" value={x["REGION_ID"]} /><label className="">{x["FIRST_DISTRICT_NAME"]}</label>
                    </div>) : null}
                </div>
              </div>
              <h1>Start date:</h1>
              <input type="date" id="start" name="trip-start" value={start}
                onChange={e => {
                  const value = document.getElementById("start").value;
                  // if (value < end) {
                  setStart(value)
                  //   }
                  // else {
                  // alert()
                  // }
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
                <div className="mb-3">
                  <input className="btn btn-primary" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </center>
      </div>
    </main>
  );
}