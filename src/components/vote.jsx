import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

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
    console.debug(data);
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
            {Travel_Schedule(selections.get(data["user_id"], data))}
        </div>
    );
}
export default Vote