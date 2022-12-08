import React, { useState, useEffect, useRef } from 'react';
import { Form, Card, Carousel, Button } from 'react-bootstrap';
import { addView } from "../reducers/routePlanSlice";
import { useDispatch } from 'react-redux';
import url from '../url';

export default function NewView({ listId, toggleShowNew,}) {
    const [autoHeight, updateAutoHeight] = useState(75);
    const textareaStyle = { //inline style
        height: `${autoHeight}px`,
    };
    const dispatch = useDispatch();
    const newViewRef = useRef(null);
    const [foundAttraction, setFoundAttraction] = useState(null);

    useEffect(() => {
        newViewRef.current.focus();
    }, []);

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
    //新增View
    function handleAddView(e) {
        // toggleRouteStatus(listId);
        dispatch(addView({
            listId,
            newView: {
                attraction_name: foundAttraction[0].attraction_name,
                attraction_id: foundAttraction[0].attraction_id,
                attraction_pluscode: foundAttraction[0].attraction_pluscode
            }
        }));

        toggleShowNew();
    }

    //更新高度值s
    function autoResize(e) {
        updateAutoHeight(newViewRef.current.scrollHeight);
    }

    return (
        <div>
            <Form>
                <Form.Control
                    as="textarea"
                    style={textareaStyle} //inline style
                    ref={newViewRef}
                    // onBlur={toggleShowNew}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddView(e);
                        }
                    }}
                    onChange={(e) => {
                        getAttraction(e.target.value);
                    }}
                    onInput={autoResize}
                />
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
                                handleAddView(e);
                            }}>Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Carousel>
            }
        </div>
    );
}