import React, { useRef, useState, useEffect } from 'react';
import { Form, Card, Button, Carousel } from "react-bootstrap";
import { updateView } from "../reducers/routePlanSlice";
import { useDispatch } from "react-redux";
import url from '../url';
export default function Edit({ viewId, editState, setEditState, listId }) {
    const styles = {
        position: "relative",
        margin: 0,
        ...editState.dimensions,
    };
    const [foundAttraction, setFoundAttraction] = useState(null);

    const dispatch = useDispatch();
    const editRef = useRef(null);

    useEffect(() => {
        editRef.current.focus();
    }, []);

    function toggleEditShow() {
        setEditState(false);
    }
    function getAttraction(name) {
        fetch(url
            , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }, body: JSON.stringify({ type: "sql", query: `select * from project.attraction where attraction_name like "%${name}%"` })
            }
        ).then((response) => {
            if (response.status !== 200) throw Error('http failed!');
            return response.text();
        }).then((raw) => {
            // console.debug(raw);
            if (!raw) throw Error('no data!');
            let parsed = JSON.parse(raw);

            if (!parsed) throw Error('wrong data format!');
            console.debug(parsed["data"])
            if (parsed["data"].length > 0) {
                console.debug(parsed["data"][0].attraction_name)
                setFoundAttraction(parsed["data"]);
            }
            else {
                setFoundAttraction(null);
            }
        }).catch((reason) => {
            console.error(reason);
        }).finally(() => {
        });
    }


    //Edit Todo
    function handleUpdateView(e) {
        console.log(viewId);
        dispatch(updateView(
            {
                listId,
                viewId,
                updatedView: {
                    attraction_name: foundAttraction[0].attraction_name,
                    attraction_id: foundAttraction[0].attraction_id,
                    attraction_pluscode: foundAttraction[0].attraction_pluscode
                }
            }));
        toggleEditShow();
    }



    return (
        <div>
            <Form className="edit-form" onClick={toggleEditShow}>
                <div>
                    <Form.Control
                        style={styles}
                        ref={editRef}
                        as="textarea"
                        row="3"
                        // onBlur={toggleEditShow}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            getAttraction(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleUpdateView(e);
                            }
                        }}
                    />
                </div>
            </Form>

            {foundAttraction &&
                <Carousel style={{ position: 'relative', height: '400px' }}>
                    <Card style={{ position: 'relative', width: 'auto', color: "black", height: '300px' }}>
                        <Card.Body style={{ height: '80%' }} >
                            <Card.Title>{foundAttraction[0].attraction_name}</Card.Title>
                            <Card.Text style={{ fontSize: "14px", height: '80%', position: 'relative', maxHeight: '180px', overflowY: 'scroll' }}>
                                {foundAttraction[0].attraction_desc_path}
                            </Card.Text>
                            <Button variant="primary" onClick={(e) => {
                                handleUpdateView(e);
                            }}>Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Carousel>
            }
        </div>
    );

}
