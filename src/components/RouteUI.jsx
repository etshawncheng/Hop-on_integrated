import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Dropdown, Button, ButtonGroup, Card } from 'react-bootstrap';
import List from "../containers/ListContainer";
import { useLocation, useNavigate } from 'react-router-dom';
import ViewSearchField from '../containers/ViewSearchFieldContainer';
import MapUI from '../containers/MapUIContainer';
import { formMapPlan, updateVersion } from "../reducers/routePlanSlice";
import { updateMapPlan } from "../reducers/mapSettingSlice";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import url from '../url';
import TopNav from './topNav';



export default function RouteUI({ routePlan }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkShow, setCheckShow] = useState(false)
  const [cookies, setCookie] = useCookies();
  const [curStat, setCurStat] = useState(null);
  const [curVerIndex, setCurVerIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [newOrNot, setNewOrNot] = useState(0)
  const [routeChanged, setRouteChanged] = useState(false);
  const [final, setFinal] = useState(true);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    // checkStat()
    getRound()
    if (cookies.round[-1] === 'v') {
      navigate("/Vote");
    } else if (cookies.round[-1] === 'c') {
      setFinal(true)
    } else {
      setCheckShow(true)
    }
  }, [])


  useEffect(() => {
    if (routePlan.versions.length === 0) {
      fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where team_id=${cookies.team_id}` })

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
                  route: route,
                  vote: x.vote
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
    else {
      console.debug("fetched");
      const mapPlan = formMapPlan(routePlan.versions[curVerIndex].route[index].views);
      console.log(mapPlan);
      dispatch(updateMapPlan(mapPlan))
      setRouteChanged(routePlan.versions[curVerIndex].routeChanged)
      const userId = routePlan.versions[curVerIndex].userId
      console.debug("userId: " + userId)
      setNewOrNot(!checkExists() && userId === 0)
      // setEditPermissions(cookies.user_id == userId || newOrNot)
    }
  }, [routePlan, index, curVerIndex])

  function checkExists() {
    const exist = routePlan.versions.map(x => { return (x.userId == cookies.user_id ? true : false) })
    return exist.includes(true) ? true : false
  }

  function getRound() {
    fetch(url
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }, body: JSON.stringify({ type: "sql", query: `select * from project.team where team_id=${cookies.team_id}` })

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
      const round = parsed["data"][0].completed
      console.log("round:" + round)
      setCookie("round", round, { path: "/", maxAge: 24 * 60 * 60 })
    }).catch((reason) => {
      console.error(reason);
    }).finally(() => {
    });
  }

  function handleSubmit() {
    let route = routePlan.versions[curVerIndex].route.map(day => day.views.map(x => x.attraction_id).join(',')).join('/')
    console.debug(route)
    alert('成功提交')
    let q = '';
    if (routeChanged) {
      let q = `INSERT INTO project.schedule_version VALUES (${cookies.team_id}, ${cookies.user_id}, ${routePlan.versions[curVerIndex].editCount + 1}, "${route}",'')`

      fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "sql", query: q })

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
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });
    } else {
      let q = `select vote from project.schedule_version where team_id =${cookies.team_id} and user_id =${routePlan.versions[curVerIndex].userId} and edit_count=${routePlan.versions[curVerIndex].editCount}`
      fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "sql", query: q })

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
        const oldVote = parsed["data"][0].vote
        let newVote = ''
        if (oldVote==''){
          newVote = cookies.user_id
        }else{
          newVote = oldVote + "," + cookies.user_id
        }
        console.log(routePlan.versions[curVerIndex])
        let q = `update project.schesule_version set vote=${newVote} where team_id=${cookies.team_id} and user_id = ${routePlan.version[curVerIndex].userId} and edit_count = ${routePlan.versions[curVerIndex].editCount}`
        fetch(url
          , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            }, body: JSON.stringify({ type: "sql", query: q })

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
        }).catch((reason) => {
          console.error(reason);
        }).finally(() => {
        });
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });

    }
  };

  function checkStat() {
    fetch(url
      , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }, body: JSON.stringify({ type: "python", query: ["checkTeamStat.py", cookies.team_id] })
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
        // completed, intoVote, intoCheck, 沒投票的人
        setCurStat(parsed["data"]);
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });
  }

  if (routePlan.versions.length !== 0) {
    return (
      <span className='fullSpan' style={{ fontFamily: '微軟正黑體', height: '100%', weight: '100%' }}>
        {/* {final && <div><h1 style={{ postion:'relative',color: "#E6AD00", margin: "10px 0 0 0" }}>最終決定的路線</h1></div>} */}
        <div>

          {/* <MapBoard listId={index} list={routePlan[index] }>map</MapBoard> */}
          <MapUI>map</MapUI>
          <div style={{ position: 'fixed', top: '2%', right: '1%', width: '10%' }}>
            <Dropdown style={{ width: '100%', height: '100%' }} as={ButtonGroup}>
              <Button variant="success">{"使用者ID: " + routePlan.versions[curVerIndex].userId}</Button>

              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu >
                {routePlan.versions.map((version, index) => (
                  <Dropdown.Item onClick={(e) => { setCurVerIndex(index) }}>{"使用者ID: " + version.userId + ", 修改次數: " + version.editCount}</Dropdown.Item>
                )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{
            padding: '5% 50px 75px',
            height: '100vh',
            verticalAlign: 'top',
          }}>
            <Carousel slide={false} activeIndex={index} onSelect={handleSelect} interval={null} style={{ width: '25%', height: '80%', backgroundColor: '#01579b' }}>
              {routePlan.versions[curVerIndex].route.map((list, index) => (
                <Carousel.Item key={index} style={{ height: '60vh' }}>
                  <Container fluid className="board p-1" style={{ width: '80%', height: '100%' }}>
                    <Row className="m-0" style={{ height: '90%' }}>
                      <List
                        key={index}
                        curVerIndex={curVerIndex}
                        list={list}
                        listId={index}
                      />
                    </Row>
                    <div style={{ position: "relative", display: 'inlineBlock' }}>
                      {routeChanged ? null : <Button onClick={(e) => handleSubmit()} style={{ borderColor: '#157347', backgroundColor: '#157347' }}> 滿意目前的行程</Button>}   
                      {routeChanged ? <Button onClick={(e) => { handleSubmit() }} style={{ borderColor: '#157347', backgroundColor: '#157347' }} >提交修改後路線</Button> : console.log("noChange")}
                    </div>
                  </Container>
                </Carousel.Item>))}
            </Carousel>
          </div>
          <ViewSearchField />
          {checkShow ? (
            <div>
              <Card style={{ position: 'fixed', left: '3%', bottom: '2%', width: '10%', height: '10%' }} key={index}>
                <Card.Body>
                  <Card.Title>還沒有表態的人</Card.Title>
                  <Card.Text style={{ width: '100%' }}>
                    <div>{curStat}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
            : null}
        </div>
      </span >
    );

  } else {
    console.debug(routePlan.versions)
    return null
  }
}