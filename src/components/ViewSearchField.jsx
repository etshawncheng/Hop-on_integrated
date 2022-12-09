import React, { useState, useEffect} from 'react';
import { Form, Card, Button, Carousel, Container, Alert } from "react-bootstrap";
import { updateView } from "../reducers/routePlanSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { faEyeSlash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { updateFoundAttractions, toggleShow } from '../reducers/searchFieldSlice';
import url from '../url';


export default function ViewSerachFields({ searchFieldSettings }) {
    const [showResults, setShowResults] = useState(true);
    const dispatch = useDispatch();


    function groupArray(array, subGroupLength) {
        var index = 0;
        var newArray = [];

        while (index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }

        return newArray;
    }

    function handleUpdateView(foundAttraction) {
        dispatch(updateView(
            {
                listId: searchFieldSettings.listId,
                viewId: searchFieldSettings.viewId,
                updatedView: {
                    attraction_name: foundAttraction.attraction_name,
                    attraction_id: foundAttraction.attraction_id,
                    attraction_pluscode: foundAttraction.attraction_pluscode
                }
            }));
        dispatch(toggleShow());
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
            if (parsed["data"].length > 0) {
                dispatch(updateFoundAttractions({ foundAttractions: parsed["data"] }));
            }
            else {
                dispatch(updateFoundAttractions({ foundAttractions: null }));
            }
        }).catch((reason) => {
            console.error(reason);
        }).finally(() => {
        });
    }

    useEffect(() => {
        // document.getElementById("searchForm").reset();
        dispatch(updateFoundAttractions({ foundAttractions: null }));
    },[searchFieldSettings.viewId])


    function render() {
        return (
            <div style={{ position: 'fixed', width: '70%', height: '50%', bottom: '0', right: '0' }}>
                {showResults ?
                    <div>
                        {searchFieldSettings.foundAttractions !== null ?
                            <div style={{ height: '90%', position: 'relative' }}>
                                <Carousel
                                    interval={null}
                                    style={{ height: '100%', width: '100%', position: 'relative' }}
                                    nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" style={{ marginRight: "-50%" }} />}
                                    prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" style={{ marginLeft: '-50%' }} />}
                                >
                                    {console.log(searchFieldSettings.foundAttractions)}
                                    {groupArray(searchFieldSettings.foundAttractions, 3).map(function (foundAttractionGroup, index) {
                                        return (
                                            <Carousel.Item key={index} style={{ height: '45vh', width: '100%', backgroundColor: 'rgba(1,87,155,0.7)', position: 'relative' }}>
                                                <Container style={{ height: '100%', width: "80%" }}>
                                                    {foundAttractionGroup.map(function (foundAttraction) {
                                                        return (
                                                            <Card key={foundAttraction.attraction_id} style={{ width: '30%', color: "black", height: '80%' }}>
                                                                <Card.Body style={{ height: '80%' }} >
                                                                    <Card.Title style={{ height: '15%', marginBottom: '5%' }}>{foundAttraction.attraction_name}</Card.Title>
                                                                    <Card.Text style={{ fontSize: "14px", height: '70%', position: 'relative', maxHeight: '60%   ', overflowY: 'scroll' }}>
                                                                        {foundAttraction.attraction_desc_path}
                                                                    </Card.Text>
                                                                    <Button variant="primary"
                                                                        style={{ height: "15%" }}
                                                                        onClick={(e) => {
                                                                            handleUpdateView(foundAttraction);
                                                                        }}>加入行程</Button>
                                                                </Card.Body>
                                                            </Card>)
                                                    }
                                                    )}
                                                </Container>
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>
                            </div> : <Alert key={'warning'} style={{ position: 'fixed', bottom: '5%', right: '32%' }} variant={'warning'}>
                                No results
                            </Alert>}
                    </div> : null}
                <div style={{ position: 'fixed', paddingLeft: '22%', height: '5%', width: '100%', bottom: '0' }}>
                    <Form id="searchForm" style={{ position: 'relative', float: 'left', width: '30%', height: '100%' }}>
                        <Form.Control
                            // style={}
                            onChange={(e) => {
                                getAttraction(e.target.value)
                            }}
                        />
                    </Form>
                    <Button style={{ position: 'relative' }} onClick={() => { setShowResults(!showResults) }} >
                        <FontAwesomeIcon icon={faEyeSlash} />
                    </Button>
                    <Button style={{ position: 'relative' }} onClick={() => { dispatch(toggleShow())}} >
                        <FontAwesomeIcon icon={faCircleXmark} style={{color:"#FF5C11",}} />
                    </Button>
                </div>
            </div>)
    }
    return searchFieldSettings.show ? render() : null;

}