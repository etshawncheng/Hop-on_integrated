import React, { useRef, useEffect } from 'react';
import { Form } from "react-bootstrap";
import { updateView } from "../reducers/routePlanSlice";
import { useDispatch} from "react-redux";

export default function Edit({ routePlan, viewId, editState, setEditState, listId }) {
    const styles = {
        position: "relative",
        margin: 0,
        ...editState.dimensions,
    };

    const dispatch = useDispatch();
    const editRef = useRef(null);

    useEffect(() => {
        editRef.current.focus();
    }, []);

    function toggleEditShow() {
        setEditState(false);
    }

    //Edit Todo
    function handleUpdateView(e) {
        if (e.target.value.trim()) {
            // toggleRouteStatus(editState.listId);
            dispatch(updateView(listId, viewId, e.target.value));
        }
        e.target.value = "";
        toggleEditShow();
    }


    return (
        <Form className="edit-form" onClick={toggleEditShow}>
            <div>
                <Form.Control
                    style={styles}
                    ref={editRef}
                    as="textarea"
                    row="3"
                    onBlur={toggleEditShow}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(editRef.current.getBoundingClientRect());
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleUpdateView(e);
                        }
                    }}
                />
            </div>
        </Form>
    );

}
