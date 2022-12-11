import Vote from './Vote';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TopNav from './topNav';
import { useCookies } from 'react-cookie';
import { updateVersion } from "../reducers/routePlanSlice";
import { useDispatch } from 'react-redux';
import url from '../url';
import './Vote.css';



export default function VotePanel({ routePlan }) {
    const [voteSetting, setVoteSetting] = useState({
        //預設全部false
        selections: new Array(routePlan.versions.length).fill(false),
        radio:new Array(routePlan.versions.length).fill(false),
    })
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const dispatch = useDispatch();

    function updateVoteSetting(type, index, value) {
        if (type === 'selections') {
            const newSele = voteSetting.selections
            newSele.splice(index, 1, value);
            setVoteSetting({ ...voteSetting, selections: newSele })
        } else if (type === 'radio') {
            const def = new Array(voteSetting.radio.length).fill(false);
            def.splice(index, 1, value);
            setVoteSetting({  ...voteSetting ,radio: def})
        }
    }

    useEffect(() => {
        if (routePlan.versions.length === 0) {
          fetch(url
            , {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where team_id=${cookies.team_id}` })
    
            }
          ).then((response) => {
            if (response.status !== 200) throw Error('http failed!');
            return response.text();
          }).then((raw) => {
            // console.debug(raw);
            if (!raw) throw Error('no data!');
            let parsed = JSON.parse(raw);
            // console.debug(parsed);
            if (!parsed) throw Error('wrong data format!');
            console.debug(parsed["data"])
            const versionList = parsed["data"].map(x => ({ userId: x.user_id, editCount: x.edit_count, route: x.travel_schedule.split("/").map(x => x.split(",")) }))      // const viewLists = parsed["data"][0]["travel_schedule"].split("/").map(x => x.split(","));
            console.debug(versionList);
            // console.debug(viewLists.flat().map(x => "attraction_id=" + x).join(" or "))
    
            versionList.map(x => {
              console.debug(x.route.flat())
              if (x.route.flat()[0] !== "") {
                let q = `select attraction_id, attraction_name, attraction_pluscode from project.attraction where ${x.route.flat().map(y => "attraction_id=" + y).join(" or ")}`;
                fetch(url
                  , {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                    }, body: JSON.stringify({ type: "sql", query: q })
                    // ,
                    // signal: controller.signal
                  }
                ).then((response) => {
                  if (response.status !== 200) throw Error('http failed!');
                  return response.text();
                }).then((raw) => {
                  // console.debug(raw);
                  if (!raw) throw Error('no data!');
                  let parsed = JSON.parse(raw);
                  // console.debug(parsed);
                  if (!parsed) throw Error('wrong data format!');
    
                  const route = x.route.map(x =>
                  ({
                    views: parsed["data"].filter(y => -1 != x.indexOf(String(y["attraction_id"])))
                  })
    
                  );
                  console.debug(route)
                  dispatch(updateVersion({
                    version: {
                      userId: x.userId,
                      editCount: x.editCount,
                      final: false,
                      routeChanged: false,
                      route: route
                    },
                    userId: x.userId,
                    editCount: x.editCount,
                  }));
                }).catch((reason) => {
                  console.error(reason);
                }).finally(() => {
                });
              }
            })
          }).catch((reason) => {
            console.error(reason);
          }).finally(() => {
          });
        }
      }, [routePlan])

    console.log(routePlan)

    // function submitVote() {
    //     e.preventDefault();
    //     fetch(url
    //         , {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //             }, body: JSON.stringify({ type: "sql", query: `` })
    //             // ,
    //             // signal: controller.signal
    //         }).then((response) => {
    //             if (response.status !== 200) throw Error('http failed!');
    //             return response.text();
    //         }).then((raw) => {
    //             if (!raw) throw Error('no data!');
    //             const parsed = JSON.parse(raw);
    //             if (!parsed) throw Error('wrong data format!');
    //             let m = Math.max(...parsed["data"].map(y => y["edit_count"]));
    //             console.debug(m)
    //             let d = parsed["data"].filter(x => x["edit_count"] == m);
    //             if (d.map((x) => JSON.stringify(x)).join() == data.map((x) => JSON.stringify(x)).join()) {
    //                 console.debug("submit");
    
    //                 const user_id = Array(...e.target)
    //                     .filter((x) => x.type == "radio")
    //                     .filter((x) => x.checked)[0].value;
    //                 const q = `update project.schedule_version set vote=(select vote from (select max(edit_count) as m, vote from project.schedule_version where team_id = 23) as tmp where edit_count=m)+1 where team_id=23 and user_id=${user_id}`;
    //                 // fetch(url
    //                 //     , {
    //                 //         method: "POST",
    //                 //         headers: {
    //                 //             "Content-Type": "application/json",
    //                 //             "Accept": "application/json",
    //                 //         }, body: JSON.stringify({ query: q })
    //                 //     }
    //                 // )
    //             } else {
    //                 setData(d);
    //                 throw Error('data have been changed!');
    //             }
    //         }).catch((reason) => {
    //             console.error(reason);
    //             setErr(reason);
    //         }).finally(() => {
    //         });
    // }

    return (
        <main style={{ padding: "1rem 0", width: "80%", alignItems: "center", margin: "auto" }}>
            {TopNav("投票", navigate)}
            <div className="row p-3 border bg-light justify-content-md-center">
                <div className="col-sm-8">
                    <label>
                        {"對伍編號: " + cookies.team_id}
                    </label>
                </div>
            </div>
            <form>
                {routePlan.versions.map((x, index) => (
                    <Vote
                        key={index}
                        route={x.route}
                        voteId={index} 
                        updateVoteSetting={updateVoteSetting} 
                        selected={voteSetting.selections[index]} 
                        radio={voteSetting.radio[index]} />
                ))}
                <div className="row p-3 border bg-light justify-content-md-center">
                    <div className="col-sm-8">
                        <button type="submit" className="btn btn-primary" onClick={(e) => { }}>送出</button>
                    </div>
                </div>
            </form>
        </main>
    );
};