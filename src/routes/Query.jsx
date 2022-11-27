import Vote from '../components/vote';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import TopNav from '../components/topNav';
import SpotList from '../components/spotList';
const url = 'http://localhost:5000/api';
function submitQuery(e) {
    e.preventDefault();
    console.debug(e.target);
}
function SearchOptions(data) {
    return <option key={data["attraction_id"]} value={data["attraction_id"]}>{data["attraction_name"]}</option>
}
function fetchSpot(e, searchKey, setsearchResults) {
    e.preventDefault();
    const value = document.getElementById("spot-name").value;
    if ('' == value) {
        console.debug("illegal empty search key");
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
            console.debug(`${value} in spotLists`);
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
        console.debug(spotLists);
        console.debug(parsed["data"][0]);
        L.push(parsed["data"][0]);
        setSpotLists(L);
    }).catch((reason) => {
        console.error(reason);
    }).finally(() => {
    });
}

function Queries() {
    const [searchKey, setSearchKey] = useState("");
    const [searchResults, setsearchResults] = useState(null);
    const [preferedList, setPreferedList] = useState([]);
    const [unpreferedList, setUnpreferedList] = useState([]);
    const [prefered, setPrefered] = useState(true);
    useEffect(() => {

    }, [searchKey, searchResults, prefered, preferedList, unpreferedList])
    return (
        <main style={{ padding: "1rem 0" }}>
            {/* {TopNav("Query")} */}

            <form onSubmit={(e) => { submitQuery(e) }}>
                <p>偏好的旅遊類型？(可複選)</p>
                <div className="input-group mb-3">
                    <div className="input-group-text bg-white flex-fill flex-column">
                        <div className="input-group">
                            <div className="input-group-text bg-white">
                                <input className="form-check-input mt-0" id="userNeed1-1" type="checkbox" name="userNeed1" value="線上教學方法" />
                            </div>
                            <label className="input-group-text">大自然</label>
                        </div>
                        <div className="input-group">
                            <div className="input-group-text bg-white">
                                <input className="form-check-input mt-0" id="userNeed1-2" type="checkbox" name="userNeed1" value="線上課程教案設計" />
                            </div>
                            <label className="input-group-text">藝文體驗</label>
                        </div>
                        <div className="input-group">
                            <div className="input-group-text bg-white">
                                <input className="form-check-input mt-0" id="userNeed1-3" type="checkbox" name="userNeed1" value="設備與軟體操作" />
                            </div>
                            <label className="input-group-text">室內靜態</label>
                        </div>
                        <div className="input-group">
                            <div className="input-group-text bg-white">
                                <input className="form-check-input mt-0" id="userNeed1-4" type="checkbox" name="userNeed1" value="無法掌握學生學習狀況" />
                            </div>
                            <label className="input-group-text">親子</label>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <span className="form-control">平均一天想去幾個景點？</span><input type="number" className="form-control" name="spot-amount" min="2" max="6" />
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
            </form>
        </main>
    )
};
export default Queries;