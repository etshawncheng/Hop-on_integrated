import React from 'react';

export default function Vote({route, voteId, updateVoteSetting, selected, radio}) {
    return (
        <div className="row p-3 border bg-light justify-content-md-center">
            <div className="col-sm-2">
                <div className="form-radio">
                    <input className="form-radio-input" type="radio"
                        checked={radio}
                        onClick={(e) => updateVoteSetting('radio', voteId, !radio)}
                    />
                    <label>選項 {voteId + 1}</label>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={selected} 
                        onChange={(e) => {
                            updateVoteSetting('selections', voteId, !selected)
                        }}
                    />
                    <label className="form-check-label"> {selected ? "顯示" : "關閉"}旅程規劃 </label>
                </div>
            </div>
            { selected ?<div className="col-8">
            {route.map((day, index) =>
                <div key={index}>
                    <span>第{index + 1}天：</span>
                    {day.views.map((a, i) =>
                        (i !== day.views.length - 1)? <>
                                <span key={a.attraction_id}>{a.attraction_name}</span>
                                <span>{" >> "}</span>
                            </>
                            : <span key={a.attraction_id}>{a.attraction_name}</span>
                    )}
                </div>)}
            </div>:null}
        </div>
    );
}
