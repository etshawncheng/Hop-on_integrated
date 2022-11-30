import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import List from "./List";
import MapUI from '../containers/MapUIContainer';
import { formMapPlan } from "../reducers/routePlanSlice";
import { updateMapPlan } from "../reducers/mapSettingSlice";
import { useDispatch } from 'react-redux';

export default function RouteUI({routePlan}) {
  
  const dispatch = useDispatch();
  //Carousel 的State
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const mapPlan = formMapPlan(routePlan[index].views);
    dispatch(updateMapPlan(mapPlan))
  },[routePlan[index].views])



  return (
    <span className='fullSpan'>
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
            {routePlan.map((list, index) => (<Carousel.Item key={index}>
              <div style={{
                padding: '10px 50px 75px',
                height: '600px',
                backgroundColor: '#ACACAC',
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
    </span >
  );
}