import '../routes/Member.css'
import TopNav from '../components/topNav';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import userIcon from '../img/icon.jpg';
import { Image, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { init } from '../reducers/historyRouteSlice';
import { updateVersion } from '../reducers/routePlanSlice';
import url from '../url';
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';
import { BsChevronCompactLeft } from 'react-icons/bs';

export default function Member({ history }) {
  const location = useLocation();
  const [notFound, setnotFound] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  function getHistory() {
    if (cookies.user_id) {
      fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "sql", query: `select * from project.team where teammate_list like '${cookies.user_id},%' or teammate_list like '%,${cookies.user_id}' or grouper_id =  ${cookies.user_id}` })
          // ,
          // signal: controller.signal
        }
      ).then((response) => {
        if (response.status !== 200) throw Error('http failed!');
        return response.text();
      }).then((raw) => {
        // console.debug(raw);
        if (!raw) throw Error('no data!');
        let parsed = JSON.parse(raw);
        // console.debug(parsed);
        if (!parsed) throw Error('wrong data format!');
        console.debug(parsed["data"]);
        if (parsed["data"].length > 0) {
          const x = parsed["data"].map(route => route.team_id);
          const teamIdArray = x.filter((item, pos) => x.indexOf(item) == pos);
          console.debug(teamIdArray);
          fetch(url
            , {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              }, body: JSON.stringify({ type: "sql", query: `select * from project.team where ${teamIdArray.flat().map(x => "team_id=" + x).join(" or ")}` })
              // ,
              // signal: controller.signal
            }
          ).then((response) => {
            if (response.status !== 200) throw Error('http failed!');
            return response.text();
          }).then((raw) => {
            // console.debug(raw);
            if (!raw) throw Error('no data!');
            let parsed = JSON.parse(raw);
            // console.debug(parsed);
            if (!parsed) throw Error('wrong data format!');
            console.debug(parsed["data"])
            const history = parsed["data"].map(x => ({ teamId: x.team_id, setTime: x.set_time, round: x.completed }))
            dispatch(init({ init: history }));
          }).catch((reason) => {
            console.error(reason);
          }).finally(() => {
          });
        }
        else {
          setnotFound(true);
        }
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });
    } else{
      navigate("/")
    }
  }

  // function getRoute(teamId) {
  //   console.debug("fetch")
  //   fetch(url
  //     , {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //       }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where team_id=${teamId}` })

  //     }
  //   ).then((response) => {
  //     if (response.status !== 200) throw Error('http failed!');
  //     return response.text();
  //   }).then((raw) => {
  //     // console.debug(raw);
  //     if (!raw) throw Error('no data!');
  //     let parsed = JSON.parse(raw);
  //     // console.debug(parsed);
  //     if (!parsed) throw Error('wrong data format!');
  //     console.debug(parsed["data"])
  //     const versionList = parsed["data"].map(x => ({ userId: x.user_id, editCount: x.edit_count, route: x.travel_schedule.split("/").map(x => x.split(",")) }))      // const viewLists = parsed["data"][0]["travel_schedule"].split("/").map(x => x.split(","));
  //     console.debug(versionList);
  //     // console.debug(viewLists.flat().map(x => "attraction_id=" + x).join(" or "))
  //     versionList.map(x => {
  //       console.debug(x.route.flat())
  //       if (x.route.flat()[0] !== "") {
  //         let q = `select attraction_id, attraction_name, attraction_pluscode from project.attraction where ${x.route.flat().map(y => "attraction_id=" + y).join(" or ")}`;
  //         fetch(url
  //           , {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               "Accept": "application/json",
  //             }, body: JSON.stringify({ type: "sql", query: q })
  //             // ,
  //             // signal: controller.signal
  //           }
  //         ).then((response) => {
  //           if (response.status !== 200) throw Error('http failed!');
  //           return response.text();
  //         }).then((raw) => {
  //           // console.debug(raw);
  //           if (!raw) throw Error('no data!');
  //           let parsed = JSON.parse(raw);
  //           // console.debug(parsed);
  //           if (!parsed) throw Error('wrong data format!');

  //           const route = x.route.map(x =>
  //           ({
  //             views: parsed["data"].filter(y => -1 != x.indexOf(String(y["attraction_id"])))
  //           })

  //           );
  //           console.debug(route)
  //           dispatch(updateVersion({
  //             version: {
  //               userId: x.userId,
  //               editCount: x.editCount,
  //               final: false,
  //               routeChanged: false,
  //               route: route
  //             },
  //             userId: x.userId,
  //             editCount: x.editCount,
  //           }));
  //         }).catch((reason) => {
  //           console.error(reason);
  //         }).finally(() => {
  //         });
  //       }
  //     })

  //   }).catch((reason) => {
  //     console.error(reason);
  //   }).finally(() => {
  //   });
  // }

  function handleClick(teamId, round) {
    setCookie("team_id", teamId, { path: "/", maxAge: 24 * 60 * 60 });
    setCookie("round", round, { path: "/", maxAge: 24 * 60 * 60 })
    navigate("/Schedule");
  }

  useEffect(() => {
    if (history.teams[0].teamId === null) {
      console.debug('getHIs')
      getHistory();
    } else {
    }
  }, [])


  return (

    <div style={{ fontFamily: '微軟正黑體' }}>
      {TopNav("個人主頁", navigate)}
      <Image onClick={() => { removeCookie("user_id"); navigate("/"); }} roundedCircle={true} src={userIcon} style={{ height: '100px', width: '100px' }} />
      <div style={{ height: '50%', width: '80%', backgroundColor: '#ACACAC', display: 'flex', justifyContent: 'left', alignItem: 'left', padding: '5% 5% 5% 5%', margin: 'auto' }}>
        {notFound ? <div style={{ fontSize: '30px', position: 'relative' }}>目前沒有行程</div> :
          <div>
            {history.teams.map((x, index) =>
              <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                  <Card.Title>{"對伍編號: " + x.teamId}</Card.Title>
                  <Card.Text style={{ width: '100%' }}>
                    <div>{"哈哈這次去哪玩呀!"}</div>
                  </Card.Text>
                  <Button variant="primary" onClick={(e) => { handleClick(x.teamId, x.round) }}>打開行程</Button>
                </Card.Body>
              </Card>
            )}
          </div>
        }
        <Card style={{ width: '18rem' }}>
          <Card.Body onClick={(e) => { navigate("/Teamup") }}>
            <FontAwesomeIcon icon={faPlus} />
            新增行程
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};