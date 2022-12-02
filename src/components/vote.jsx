import React, { useState, useEffect } from 'react';
function Travel_Schedule(shouldExsit, data, i) {
    // console.debug(data?data[i]:null)
    return (shouldExsit)
        ? <div className="col-8">
            {data ? data[i].map((d, i) =>
                <div key={i}>
                    <span>第{i + 1}天：</span>
                    {d.map((a, i) =>
                        (i !== d.length - 1)? <>
                                <span key={a["attraction_id"]}>{a["attraction_name"]}</span>
                                <span>{" >> "}</span>
                            </>
                            : <span key={a["attraction_id"]}>{a["attraction_name"]}</span>
                    )}
                </div>
            ) : null}
        </div>
        : null
}
function Vote(data, i, setSelections, selections, radio, setRadio, routes, setRoutes) {
    console.debug(routes)
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
            {Travel_Schedule(selections.get(data["user_id"]), routes, i)}
        </div>
    );
}
export default Vote