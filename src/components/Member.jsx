import '../routes/Member.css'
import TopNav from '../components/topNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import userIcon from '../img/icon.jpg';
import { Image, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { init } from '../reducers/historyRouteSlice';
import { updateVersion } from '../reducers/routePlanSlice';
import url from '../url';

export default function Member({ history }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();

  function getHistory() {
    fetch(url
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where user_id=${cookies.user_id}` })
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
        const history = parsed["data"].map(x => ({ teamId: x.team_id, setTime: x.set_time }))
        dispatch(init({ init: history }));
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });
    }).catch((reason) => {
      console.error(reason);
    }).finally(() => {
    });
  }

  function getRoute(teamId) {
    console.debug("fetch")
    fetch(url
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where team_id=${teamId}` })

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
      const versionList = parsed["data"].map(x => ({ userId: x.user_id, editCount: x.edit_count, route: x.travel_schedule.split("/").map(x => x.split(",")) }))      // const viewLists = parsed["data"][0]["travel_schedule"].split("/").map(x => x.split(","));
      console.debug(versionList);
      // console.debug(viewLists.flat().map(x => "attraction_id=" + x).join(" or "))

      versionList.map(x => {
        console.debug(x.route.flat())
        if (x.route.flat()[0] !== "") {
          let q = `select attraction_id, attraction_name, attraction_pluscode from project.attraction where ${x.route.flat().map(y => "attraction_id=" + y).join(" or ")}`;
          fetch(url
            , {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              }, body: JSON.stringify({ type: "sql", query: q })
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

            const route = x.route.map(x =>
            ({
              views: parsed["data"].filter(y => -1 != x.indexOf(String(y["attraction_id"])))
            })

            );
            console.debug(route)
            dispatch(updateVersion({
              version: {
                userId: x.userId,
                editCount: x.editCount,
                final: false,
                routeChanged: false,
                route: route
              },
              userId: x.userId,
              editCount: x.editCount,
            }));
          }).catch((reason) => {
            console.error(reason);
          }).finally(() => {
          });
        }
      })
    }).catch((reason) => {
      console.error(reason);
    }).finally(() => {
    });
  }

  function handleClick(teamId) {
    setCookie("team_id", teamId, {path:"/", maxAge:24*60*60});
    navigate("/Schedule");
  }

  useEffect(() => {
    if (history.teams[0].teamId === null) {
      console.debug('getHIs')
      getHistory();
      console.debug(history)
    }else{
      console.debug('y')
    }
  }, [history])


  return (

    <div style={{ fontFamily: '微軟正黑體' }}>
      <Image roundedCircle={true} src={userIcon} style={{ height: '100px', width: '100px' }} />
      <div style={{ height: '50%', width: '80%', backgroundColor: '#ACACAC', display: 'flex', justifyContent: 'center', alignItem: 'center', padding: '5% 5% 5% 5%', margin: 'auto' }}>
        {history.teams.map((x, index) =>
          <Card style={{ width: '18rem' }} key={index}>
            <Card.Body>
              <Card.Title>{"對伍編號: " + x.teamId}</Card.Title>
              <Card.Text style={{ width: '100%' }}>
                <div>{"哈哈這次去哪玩呀!"}</div>
              </Card.Text>
              <Button variant="primary" onClick={(e) => {handleClick(x.teamId)}}>打開行程</Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};