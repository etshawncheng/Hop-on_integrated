import Nav from 'react-bootstrap/Nav';
import Taipei from './assets/taipei-101.jpg'
import Taichung from './assets/taichung.jpg'
import Taitung from './assets/taitung.jpg'
import Tainan from './assets/台南_OG圖_shelly.jpg'
import Hualien from './assets/hualien.jpg'
import Kaohsiung from './assets/koahsuing.jpg'
import './views.css'
import TopNav from '../components/topNav';
import React, { useState, useEffect } from 'react';
import url from '../url';

function SearchOptions(data) {
  return (<>
    <div>名稱：{data["attraction_name"]}</div>
    <div>電話：{data["attraction_phone"]}</div>
    <div>地址：{data["attraction_loc"]}</div>
    <div>簡介：{data["attraction_desc_path"]}</div>
  </>)
}
function fetchSpot(e, searchKey, setsearchResults) {
  e.preventDefault();
  console.debug(e);
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
      }, body: JSON.stringify({ type: "sql", query: `select * from project.attraction where attraction_name like '%${searchKey}%';` })
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
    console.debug(parsed);
    if (!parsed) throw Error('wrong data format!');
    setsearchResults(parsed["data"]);
  }).catch((reason) => {
    console.error(reason);
  }).finally(() => {
  });
}

export function Views() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setsearchResults] = useState(null);
  useEffect(() => {
    console.debug(searchResults);
  }, [searchKey, searchResults])

  return (
    <main style={{ padding: "1rem 0" }}>
      {TopNav("Teamup")}
      <div className="container1">
        <h3 >Taipei</h3>
        <h3 >l</h3>
        <h3 >Taichung</h3>
        <h3 >l</h3>
        <h3 >Taitung</h3>
        <h3 >l</h3>
        <h3 >Tainan</h3>
        <h3 >l</h3>
        <h3 >Hualien</h3>
        <h3 >l</h3>
        <h3 >Kaohsiung</h3>
      </div>
      <div className="input-group mb-3">
        <span className="form-control">搜尋景點</span>
        <input className="form-control" type="text" placeholder="輸入景點名稱" id="spot-name" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
        <button type="button" className='btn btn-outline-dark btn-sm' value="search"
          onClick={(e) => { fetchSpot(e, searchKey, setsearchResults) }}>搜尋</button>
      </div>
      <div className="container">

        <img src={Taipei} text="Taipei" ></img>
        {/* <h3 className="centered"/>Taipei */}

        <img src={Taichung} text="Taichung" ></img>
        {/* <h3 className="centered"/>Taichung */}

        <img src={Taitung} text="Taitung"></img>
        <img src={Tainan} text="Tainan"></img>
        <img src={Hualien} text="Hualien"></img>
        <img src={Kaohsiung} text="Kaohsiung"></img>
      </div>
      <div className="" name="results" id="results">
        {(searchResults) ? <>
          {searchResults.map(x => SearchOptions(x))}
        </> : null}
      </div>
      <div className="full-page" id="tinder">tinder
        <div className="d-grid">
          <button className="btn btn-primary" type="submit" href="/Tinder">
            <Nav.Link href="/Tinder">Tinder card</Nav.Link>
          </button>
        </div>
      </div>
    </main>
  );
};