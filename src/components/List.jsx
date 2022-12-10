import React, { useState } from 'react';
import View from "./View";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import TimeLine from "./TimeLine";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from 'react-redux';
import { exchangeViewsOrder } from "../reducers/routePlanSlice";
import { toggleShow, updateIdList } from '../reducers/searchFieldSlice';
import { useEffect } from 'react';


export default function List({ title, curVerIndex, list, listId, mapSetting, editPermissions }) {
    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 0,
        }
    }))
    // const [startTime, setStartTime] = useState(null)
    // const [timeline, setTimeline] = useState(null)
    // let theDay = new Date('2022-12-02 09:00:00');
    // useEffect(() => {
    //     mapSetting.results.routes[0].legs.map((leg, index) => {
    //         {
    //             console.log(leg.duration.value);
    //             console.log(theDay.set)
    //         }
    //     }
    //     )
    // }, [mapSetting.results]
    // )

    //切換NewTodo
    function toggleShowNew(e) {
        if (editPermissions) {
            dispatch(toggleShow(true));
            dispatch(updateIdList({ curVerIndex, listId, viewId: null }));
        } else {
            alert('沒有修改權限')
        }
    }
    //導航頁面
    const [showRoute, updateShowRoute] = useState(false);
    const handleClose = () => updateShowRoute(false);
    const handleShow = () => updateShowRoute(true);

    //drag完的操作
    function drageEndEvent(props) {
        if (editPermissions) {
            const { active, over } = props
            const activeIndex = list.views.indexOf(active.id)
            const overIndex = list.views.indexOf(over.id)
            // toggleRouteStatus(listId)
            const updatedViews = arrayMove(list.views, activeIndex, overIndex)
            dispatch(exchangeViewsOrder({ curVerIndex, listId, updatedViews }));
        } else {
            alert('沒有修改權限')
        }
    }

    return (
        <div className="list p-2 m-1 rounded-lg" style={{ fontFamily: '微軟正黑體', padding: '300 200 20 20', color: 'white' }}>
            <div className="title">{title}</div>
            <h2 >第{listId + 1}天</h2>
            <DndContext onDragEnd={drageEndEvent} sensors={sensors} collisionDetection={closestCenter} >
                <SortableContext items={list.views}>
                    {list.views.map((view, index) => (
                        <View id={view} key={index} name={view.attraction_name} curVerIndex={curVerIndex} listId={listId} viewId={index} editPermissions={editPermissions} />
                    )
                    )}
                </SortableContext>
            </DndContext>
            <div style={{ verticalAlign: 'middle', lineHeight: '38px', width: '90%' }}>
                <div className="footer pt-2  d-flex" style={{ position: 'relative', float: 'left', width: '40%', height: '50px', margin: '1px 10px 1px 15px' }} >
                    <Button variant="primary" style={{ position: 'relative', width: '100%', height: '40px', top: '15px' }}
                        className="py-1 flex-grow-1 text-left"
                        onClick={toggleShowNew}
                    >新增景點</Button>
                </div>
                <div style={{ position: 'relative', float: 'left', width: '120px', height: '50px', margin: '1px 5px 1px 0px' }}>
                    <Button variant="primary" onClick={handleShow} style={{ position: 'relative', width: '100%', top: '22px', height: '40px' }}>
                        {/* <FontAwesomeIcon icon={faRoute} /> */}
                        路線資訊
                    </Button></div>
            </div>
            <Offcanvas key={listId} show={showRoute} onHide={handleClose} style={{ fontFamily: '微軟正黑體' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>路線資訊</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {mapSetting.results != null && mapSetting.results.routes[0].legs.map((leg, index) =>
                        <div className="routePanel">
                            <Card style={{ width: '18rem' }} key={index}>
                                <Card.Body>
                                    <Card.Title>{"第" + (index + 1) + "段"}</Card.Title>
                                    <Card.Text>
                                        <div>{"出發地址: " + leg.start_address}</div>
                                        <div>{"目的地址: " + leg.end_address}</div>
                                        <div>{"距離: " + leg.distance.text}</div>
                                        <div>{"時長: " + leg.duration.text}</div>

                                    </Card.Text>
                                    <Button variant="primary">詳細資料</Button>
                                </Card.Body>
                            </Card>

                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}