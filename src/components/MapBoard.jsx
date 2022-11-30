import React, { useState } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, useLoadScript } from "@react-google-maps/api";
import Spinner from 'react-bootstrap/Spinner';
import { updateResponse, updateResponseStatus } from "../reducers/routePlanSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function MapBoard({ listId, list }) {
    const { isLoaded, loadError } = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: "AIzaSyDOhTegV0-X10RYdbgQwwP7acLrluHoX4M",
    })

    // useEffect(() => {
    //     setRerender(!rerender)
    // },[list.responseStatus]);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (list.views) {
    //         console.log(list.views[0].name)
    //         console.log(list.views[list.views.length - 1].name)
    //         console.log(list.views.slice(1, -1).map(getWaypoint))
    //         setMapInfo({
    //             response: null,
    //             travelMode: 'DRIVING',
    //             waypoints: list.views.slice(1, -1).map(getWaypoint),
    //             origin: list.views[0].name,
    //             destination: list.views[list.views.length - 1].name,
    //         })
    //     }
    // }, [list])

    const options = {
        mapId:'45b41d76d6b60f19',
        zoomControlOptions: {
            position: 'RIGHT_CENTER'
        }
    }


    //取得google api response後的function
    function directionsCallback(response) {
        console.log(response)
        if (response !== null) {
            if (response.status === "OK") {
                dispatch(updateResponse({listId, updatedResponse:response}));
                dispatch(updateResponseStatus({listId, updatedResStat:"found"}));
                }
            } else {
                console.log("reponse: ", response)
            }
    }

    //取得waypoints資
    function getWaypoint(todo) {
        return (
            {
                location: todo.name,
                stopover: true
            })
    }
    const [map, setMap] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
      }, []);
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
      }, []);
    //response: null,
    // origin: lists[0].views[0].name,
    // destination: lists[0].views[lists[0].views.length - 1].name,
    // travelMode: 'DRIVING',
    // waypoints: lists[0].views.slice(1, -1).map(getWaypoint),
    const renderMap = () => {
        return (
            <div className="map-container">
                <GoogleMap
                    id='direction-example'
                    mapContainerStyle={{
                        height: '600px',
                        width: '100%'
                    }}
                    zoom={4}
                    center={{
                        lat: 0,
                        lng: -180
                    }}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={options}
                >
                    {list.responseStatus !== "found" && (<DirectionsService
                        options={{
                            travelMode: 'DRIVING',
                            waypoints: list.views.slice(1, -1).map(getWaypoint),
                            origin: list.views[0].name,
                            destination: list.views[list.views.length - 1].name,
                        }}
                        callback={directionsCallback}
                    />)}
                    {list.response !== null && list.responseStatus === "found" && (<DirectionsRenderer
                        directions={list.response} 
                    // onDirectionsChanged={()=> (console.log(list.response))}
                    />)
                    } 

                </GoogleMap>
            </div>
        )
    }
    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }
    return isLoaded ? renderMap() : <Spinner />
}

