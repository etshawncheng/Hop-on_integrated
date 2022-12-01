import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import List from "./List";
import { Button } from 'react-bootstrap';
import MapUI from '../containers/MapUIContainer';
import { formMapPlan, setRoute } from "../reducers/routePlanSlice";
import { updateMapPlan } from "../reducers/mapSettingSlice";
import { useDispatch } from 'react-redux';
import url from '../url';
import TopNav from './topNav';
export default function RouteUI({ routePlan }) {
  const dispatch = useDispatch();
  //Carousel 的State
  const [index, setIndex] = useState(0);
  const [routeChanged, setRouteChanged] = useState(false);
  const [final, setFinal] = useState(true);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  console.debug(!routePlan[0].route);

  console.debug("start")
  useEffect(() => {
    console.debug(routePlan[0].route)
    if (!routePlan[0].route) {
      console.debug("fetch")
      fetch(url
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }, body: JSON.stringify({ type: "sql", query: `select travel_schedule from project.schedule_version where user_id=0 AND team_id=1` })
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
        const viewLists = parsed["data"][0]["travel_schedule"].split("/").map(x => x.split(","));
        console.debug(viewLists)
        console.debug(viewLists.flat().map(x => "attraction_id=" + x).join(" or "))
        let q = `select attraction_id, attraction_name, attraction_pluscode from project.attraction where ${viewLists.flat().map(x => "attraction_id=" + x).join(" or ")}`;
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
          const route = viewLists.map(
            x => ({
              views: parsed["data"].filter(
                y => -1 != x.indexOf(String(y["attraction_id"]))
              )
            })
          );
          console.debug(route)
          dispatch(setRoute({ route }));
        }).catch((reason) => {
          console.error(reason);
        }).finally(() => {
        });
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
      });
    }
    else {
      console.debug("fetched");
      console.debug(routePlan[0].route[index])
      const mapPlan = formMapPlan(routePlan[0].route[index].views);
      console.log(mapPlan);
      dispatch(updateMapPlan(mapPlan))
      setRouteChanged(routePlan[0].routeChanged)
    }
  }, [routePlan[0], index])



  if (routePlan[0].route) {
    return (
      <main style={{
        padding: "1rem 0"
        // , overflow: "scroll"
      }}>
        {TopNav("Schedule")}
        <span className='fullSpan' style={{ fontFamily: '微軟正黑體' }}>
          {final && <div><h1 style={{ color: "#E6AD00", margin: "10px 0 0 0" }}>最終決定的路線</h1></div>}
          <div
            style={{
              padding: "25px 100px 75px",
              width: "100%",
              // height: "100%",
              // content: "",
              clear: 'both',
              display: 'table'
            }}>
            <div
              style={{
                display: 'inline-block',
                width: '75%',
                // textAlign: 'center'
              }}>
              {/* <MapBoard listId={index} list={routePlan[index] }>map</MapBoard> */}
              <MapUI>map</MapUI>
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '25%',
                height: '600px',
                verticalAlign: 'top',
                // height: '100%',
              }}>
              <Carousel fade activeIndex={index} onSelect={handleSelect} interval={null}>
                {routePlan[0].route.map((list, index) => (<Carousel.Item key={index}>
                  <div style={{
                    padding: '10px 50px 75px',
                    height: '600px',
                    backgroundColor: '#01579b',
                    verticalAlign: 'top',
                  }}>
                    <Container fluid className="board p-1">
                      <Row className="m-0">
                        <List
                          key={index}
                          list={list}
                          listId={index}
                        />
                      </Row>
                    </Container>
                  </div>
                </Carousel.Item>))}
              </Carousel>
            </div>
          </div>
          <div>
            {routeChanged && <Button >提交修改後路線</Button>}
          </div>
        </span >
      </main>);
  } else {
    return null
  }
}