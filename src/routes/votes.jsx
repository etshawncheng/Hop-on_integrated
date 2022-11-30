import Vote from '../components/vote';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TopNav from '../components/topNav';
import { useCookies } from 'react-cookie';
import url from '../url';
function submitVote(e, data, setData, setErr, cookies) {
    e.preventDefault();
    fetch(url
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where team_id = 1 and user_id=${cookies["user_id"]}` })
            // ,
            // signal: controller.signal
        }).then((response) => {
            if (response.status !== 200) throw Error('http failed!');
            return response.text();
        }).then((raw) => {
            if (!raw) throw Error('no data!');
            const parsed = JSON.parse(raw);
            if (!parsed) throw Error('wrong data format!');
            if (parsed["data"].map((x) => JSON.stringify(x)).join() == data.map((x) => JSON.stringify(x)).join()) {
                console.debug("submit");
                const user_id = Array(...e.target)
                    .filter((x) => x.type == "radio")
                    .filter((x) => x.checked)[0].value;
                const q = `update project.schedule_version set vote=(select vote from (select max(edit_count) as m, vote from project.schedule_version where team_id = 23) as tmp where edit_count=m)+1 where team_id=23 and user_id=${user_id}`;
                // fetch(url
                //     , {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //             "Accept": "application/json",
                //         }, body: JSON.stringify({ query: q })
                //     }
                // )
            } else {
                setData(parsed["data"]);
                throw Error('data have been changed!');
            }
        }).catch((reason) => {
            console.error(reason);
            setErr(reason);
        }).finally(() => {
        });
}

export function Votes() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [radio, setRadio] = useState(null);
    // const [btnType, setBtnType] = useState('radio');
    const [selections, setSelections] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    useEffect(() => {
        console.debug(cookies);
        // const controller = new AbortController();
        if (loading === false & data === null) {
            setLoading(true);
            console.debug('fetching');
            fetch(url
                , {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }, body: JSON.stringify({ type: "sql", query: `select * from project.schedule_version where user_id=${cookies["user_id"]}` })
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
                setData(parsed["data"]);
                setErr(null);
                setSelections(new Map(parsed["data"].map((x) => [x["user_id"], false])));
                setRadio(parsed["data"][0]["user_id"]);
            }).catch((reason) => {
                console.error(reason);
                setErr(reason);
                // navigate("");
            }).finally(() => {
                setLoading(false);
            });
        }
        // return () => {
        //     controller.abort();
        // }
    }, [loading, data, err, selections, radio, cookies]);
    // console.debug(err === null & loading === false & data !== null);
    if (err === null & loading === false & data !== null) {
        // console.debug(selections);
        return (
            <main style={{ padding: "1rem 0" }}>
                {TopNav("Votes")}
                <div className="row p-3 border bg-light justify-content-md-center">
                    <div className="col-sm-8">
                        <label>隊伍1</label>
                    </div>
                </div>
                <form onSubmit={(e) => submitVote(e, data, setData, setErr, cookies)}>
                    {[{user_id: 0, travel_schedule:""}, {user_id: 1, travel_schedule:""}].map((x, i) => Vote(x, i, setSelections, selections, radio, setRadio))}
                    <div className="row p-3 border bg-light justify-content-md-center">
                        <div className="col-sm-8">
                            <button type="submit" className="btn btn-primary">送出</button>
                        </div>
                    </div>
                </form>
            </main>
        );
    } else if (err) {
        return (<h1>error</h1>);

        // return <Navigate to="/error" state={err} />
    } else {
        return (<h1>error</h1>);
    }
};