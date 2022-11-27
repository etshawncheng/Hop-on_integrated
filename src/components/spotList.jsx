import React, { useState, useEffect } from "react";

function convertHoverd(hovereds, setHovereds, key) {
    const M = new Map(hovereds.entries());
    M[key] = !M[key];
    setHovereds(M);
}
function SpotList(spotList, setSpotList) {
    const [hovereds, setHovereds] = useState(new Map(spotList.map(x => [x["attraction_id"], false])));
    return spotList.map((x) =>
        <>
            <span
                onMouseEnter={(e) => { convertHoverd(hovereds, setHovereds, x["attraction_id"]) }}
                onMouseLeave={(e) => { convertHoverd(hovereds, setHovereds, x["attraction_id"]) }}
            >{(x["attraction_name"].length > 6)
                ? x["attraction_name"].slice(0, 6) + "..."
                : (x["attraction_name"])}
            </span>
            {hovereds[x["attraction_id"]] ?
                <button type="button" className='btn btn-primary' value="remove"
                    onClick={(e) => {
                        setSpotList(spotList.filter(y => y["attraction_id"] !== x["attraction_id"]));
                    }}
                >移除</button> : null}
            <br></br>
        </>)
}
export default SpotList;