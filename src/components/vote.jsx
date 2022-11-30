import React, { useState, useEffect } from 'react';
import { formMapPlan } from "../reducers/routePlanSlice";
import { updateMapPlan } from "../reducers/mapSettingSlice";
import { useDispatch } from 'react-redux';
import List from "./List";
import { Carousel, Container, Row } from 'react-bootstrap';
function Travel_Schedule(shouldExsit, data) {
    return (shouldExsit, data)
        ? <div className="col-8">
            <div>
                <label>
                    {data["travel_schedule"]}
                </label>
            </div>
        </div>
        : null
}
function Vote(data, i, setSelections, selections, radio, setRadio) {
    const routePlan = data[""];
    const dispatch = useDispatch();
    //Carousel 的State
    const [index, setIndex] = useState(0);
    const [routeChanged, setRouteChanged] = useState(false);
    const [final, setFinal] = useState(true);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const mapPlan = formMapPlan(routePlan[0].route[index].views);
        dispatch(updateMapPlan(mapPlan))
        setRouteChanged(routePlan[0].routeChanged)
    }, [routePlan[0].route[index].views])


    return (
        <div className="row p-3 border bg-light justify-content-md-center" key={data["user_id"]}>
            <div className="col-sm-2">
                <div className="form-radio">
                    <input className="form-radio-input" type="radio" value={data["user_id"]}
                        checked={data["user_id"] == radio}
                        onChange={(e) => { setRadio(data["user_id"]); }}
                    />
                    <label>選項 {i + 1}</label>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={selections.get(data["user_id"])}
                        onChange={(e) => {
                            const map = new Map(selections);
                            map.set(data["user_id"], !selections.get(data["user_id"]));
                            setSelections(map);
                        }}
                    />
                    <label className="form-check-label"> {selections.get(data["user_id"]) ? "顯示" : "關閉"}旅程規劃 </label>
                </div>
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
    );
}
export default Vote