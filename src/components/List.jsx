import React, { useState } from 'react';
import View from "./View";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import NewView from "./NewView";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useDispatch} from 'react-redux';
import { exchangeViewsOrder } from "../reducers/routePlanSlice";


export default function List({ title, list, listId }) {

    const [showNew, updateShowNew] = useState(false);
    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            delay: 500,
            tolerance: 0,
        }
    }))

    //切換NewTodo
    function toggleShowNew(e) {
        updateShowNew(!showNew);
    }
    //導航頁面
    const [showRoute, updateShowRoute] = useState(false);
    const handleClose = () => updateShowRoute(false);
    const handleShow = () => updateShowRoute(true);

    //drag完的操作
    function drageEndEvent(props) {
        const { active, over } = props
        const activeIndex = list.views.indexOf(active.id)
        const overIndex = list.views.indexOf(over.id)
        // toggleRouteStatus(listId)
        const updatedViews = arrayMove(list.views, activeIndex, overIndex)
        dispatch(exchangeViewsOrder({listId, updatedViews}));
    }

    return (
        <div className="list p-2 m-1 rounded-lg" style={{fontFamily:'微軟正黑體'}}>
            <div className="title">{title}</div>
            <DndContext onDragEnd={drageEndEvent} sensors={sensors} collisionDetection={closestCenter}>
                <SortableContext items={list.views}>
                    <h2 >第{listId+1}天</h2>
                    {list.views.map((view, index) => (
                        <View id={view} key={index} name={view.name} listId={listId} viewId={index} />
                    ))}
                </SortableContext>
            </DndContext>
            {showNew && <NewView listId={listId} toggleShowNew={toggleShowNew}/>}
            <div style={{verticalAlign:'middle', lineHeight: '38px', width:'90%'}}>
                {!showNew && (
                    <div className="footer pt-2  d-flex" style={{position:'relative',float: 'left',width:'40%', height:'50px', margin:'1px 10px 1px 15px'}} >
                        <Button style={{position:'relative', width:'100%', height:'40px',top: '15px'}}
                            className="py-1 flex-grow-1 text-left"
                            onClick={toggleShowNew}
                        >新增景點</Button>
                    </div>)}
                <div style={{position:'relative', float: 'left',width:'120px',height:'50px',margin:'1px 5px 1px 0px'}}>
                    <Button variant="primary" onClick={handleShow} style={{position:'relative', width:'100%', top: '22px', height:'40px'}}>
                        <FontAwesomeIcon icon={faRoute} />路線資訊
                    </Button></div>
            </div>
            <Offcanvas key={listId} show={showRoute} onHide={handleClose} style={{fontFamily:'微軟正黑體'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>路線資訊</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {list.response != null && list.response.routes[0].legs.map((leg, index) =>
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