import React, { useState, useRef } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { removeView } from "../reducers/routePlanSlice";
import { toggleShow, updateIdList } from '../reducers/searchFieldSlice';
import { useDispatch } from 'react-redux';

export default function View({ id, viewId, name, listId, curVerIndex }) {
    const [isOver, setIsOver] = useState(false);
    const dispatch = useDispatch();
    const targetRef = useRef(null);
    const { setNodeRef, listeners, transform, transition } = useSortable({ id });
    const letter = String.fromCharCode(viewId + 'A'.charCodeAt(0));

    const styles = {
        marginTop: "10px",
        transform: CSS.Translate.toString(transform),
        transition,
        fontSize: '24px',
        fontFamily: '微軟正黑體',
        color: 'white'
    }

    function handleClickDelete() {
        dispatch(removeView({ curVerIndex, listId, viewId }));
    }

    function handleOnOver() {
        setIsOver(true);
    }

    function handleOnLeave() {
        setIsOver(false);
    }
    //edit 按鈕功能
    function handleClickEdit() {
        dispatch(toggleShow(true));
        dispatch(updateIdList({ curVerIndex, listId, viewId }));
    }

    return (
        <div ref={setNodeRef}
            {...listeners}
            style={styles}
        >
            <div className="todo my-1 p-1 rounded"
                onMouseEnter={handleOnOver}
                onMouseLeave={handleOnLeave}
                ref={targetRef}
            >
                {letter + '.  ' + name}
                {isOver && (
                    <Button className="edit-button m-1" size="sm" onClick={handleClickEdit}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>)}
                {isOver && (
                    <Button className="delete-button m-1" size="sm" onClick={handleClickDelete}>
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#FF5C11", }} />
                    </Button>
                )}
            </div>
        </div>
    );
}