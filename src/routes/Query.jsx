import Vote from '../components/vote';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Query.css';
import React from 'react';
import TopNav from '../components/topNav';
import SpotList from '../components/spotList';
import url from '../url';
import { useCookies } from 'react-cookie';

function submitQuery(e, cookies, prefered_spot, unprefered_spot, setSubmitted) {
    e.preventDefault();
    // console.debug(e.target);
    // return;
    const spot = [];
    const team_id = cookies["team_id"];
    const user_id = cookies["user_id"];
    let spot_per_day = document.getElementsByName("spot-amount")[0].value;
    console.debug(spot_per_day)
    const spot_type = [];
    const liked_spot_list = prefered_spot.map(x => x["attraction_id"]).join(",") + "/" + unprefered_spot.map(x => x["attraction_id"]).join();
    console.debug(liked_spot_list)
    const q = `INSERT INTO project.comprehensive_inquiry(team_id,user_id,spot_type,spot_per_day,liked_spot_list)VALUES(${team_id},${user_id},${spot_type},${spot_per_day},${liked_spot_list})`;
    console.debug(q);
    return;
    // fetch
    setSubmitted(true);
}
function SearchOptions(data) {
    return <option key={data["attraction_id"]} value={data["attraction_id"]}>{data["attraction_name"]}</option>
}
function fetchSpot(e, searchKey, setsearchResults) {
    e.preventDefault();
    const value = document.getElementById("spot-name").value;
    if ('' == value) {
        alert("illegal empty search key");
        return;
    }
    fetch(url
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }, body: JSON.stringify({ type: "sql", query: `select attraction_id,attraction_name from project.attraction where attraction_name like '%${searchKey}%';` })
            // ,
            // signal: controller.signal
        }
    ).then((response) => {
        if (response.status !== 200) throw Error('http failed!');
        return response.text();
    }).then((raw) => {
        // console.debug(raw);
        if (!raw) throw Error('no data!');
        const parsed = JSON.parse(raw);
        // console.debug(parsed);
        if (!parsed) throw Error('wrong data format!');
        setsearchResults(parsed["data"]);
    }).catch((reason) => {
        console.error(reason);
    }).finally(() => {
    });
}
function addSpot(e, spotLists, setSpotLists) {
    e.preventDefault();
    // select * from project.attraction;
    const value = document.getElementById("results").value;
    for (let i = 0; i < spotLists.length; i++) {
        if (spotLists[i]["attraction_id"] == value) {
            // display user
            alert(`${value} in spotLists`);
            return;
        }
    }
    // return;
    fetch(url
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }, body: JSON.stringify({ type: "sql", query: `select * from project.attraction where attraction_id=${value};` })
            // ,
            // signal: controller.signal
        }
    ).then((response) => {
        if (response.status !== 200) throw Error(`http failed: ${response.status}!`);
        return response.text();
    }).then((raw) => {
        // console.debug(raw);
        if (!raw) throw Error('no data!');
        const parsed = JSON.parse(raw);
        // console.debug(parsed);
        if (!parsed) throw Error('wrong data format!');
        const L = spotLists.map(x => x);
        // console.debug(spotLists);
        // console.debug(parsed["data"][0]);
        L.push(parsed["data"][0]);
        setSpotLists(L);
    }).catch((reason) => {
        console.error(reason);
    }).finally(() => {
    });
}

export function Queries() {
    const [searchKey, setSearchKey] = useState("");
    const [searchResults, setsearchResults] = useState(null);
    const [preferedList, setPreferedList] = useState([]);
    const [unpreferedList, setUnpreferedList] = useState([]);
    const [prefered, setPrefered] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"])
    const navigate = useNavigate()
    const [submited, setSubmitted] = useState(false);

    useEffect(() => {
        if (submited) {
            alert("submit success");
            navigate("/Tinder");
        }
    }, [searchKey, searchResults, prefered, preferedList, unpreferedList, submited])
    return (
        <main style={{
            padding: "1rem 0", width: "80%", alignItems: "center", margin: "auto"
        }}>
            {TopNav("Query")}
            
            <form onSubmit={(e) => { submitQuery(e, cookies, preferedList, unpreferedList, setSubmitted) }}>
                <p>偏好的旅遊類型？(可複選)</p>
                <div className="input-group mb-3">
                    <div className='form-control border-white'>
                        <div className="row">
                            {['山林', '戶外', '室內', '飲食', '海', '在地體驗', '攝影', '動物', '歷史', '運動', '親子'].map(x =>
                                <div className="input-group-text col bg-white">
                                    <div className="">
                                        <input className="form-check-input mt-0" name="spot-type" type="checkbox" value={x} />
                                    </div>
                                    <label className="">{x}</label>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <span className="form-control">平均一天想去幾個景點？</span>
                    <input type="number" className="form-control" name="spot-amount" min="2" max="6" />
                    <span className="form-control">搜尋景點</span>
                    <input className="form-control" type="text" placeholder="輸入景點名稱" id="spot-name" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                    <button type="button" className='btn btn-primary' value="search"
                        onClick={(e) => { fetchSpot(e, searchKey, setsearchResults) }}>搜尋</button>
                </div>
                <div className="input-group mb-3">
                    <span className="form-control">搜尋結果</span>
                    <select name="results" id="results">
                        {(searchResults) ? <>
                            {searchResults.map(x => SearchOptions(x))}
                        </> : null}
                    </select>
                    <button type="button" className='btn btn-primary' value="add"
                        onClick={(e) => {
                            if (prefered) { addSpot(e, preferedList, setPreferedList) }
                            else { addSpot(e, unpreferedList, setUnpreferedList) }
                        }}>加入</button>
                    <button type="button" className={(prefered) ? 'btn btn-primary' : 'btn btn-dark'}
                        value={(prefered) ? "prefered" : "not-prefered"}
                        onClick={(e) => { setPrefered(!prefered) }}>
                        {(prefered) ? "想去" : "不想去"}
                    </button>
                </div>
                <div className="input-group mb-3">
                    <span className="form-control">想去的景點</span>
                    <span className="form-control">{(preferedList) ? SpotList(preferedList, setPreferedList) : null}</span>
                </div>
                <div className="input-group mb-3">
                    <span className="form-control">不想去的景點</span>
                    <span className="form-control">{(unpreferedList) ? SpotList(unpreferedList, setUnpreferedList) : null}</span>
                </div>
                <button type="submit" className='btn btn-primary' value="submit">送出</button>
            </form >
        </main >
    )
};