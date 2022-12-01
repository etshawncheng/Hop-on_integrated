/* global google*/
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useJsApiLoader, DirectionsService, GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { updateResults} from '../reducers/mapSettingSlice';
import { Spinner } from 'react-bootstrap';


export default function MapUI({ mapSetting }) {
    const center = { lat: 25.033964, lng: 121.564468 }
    const dispatch = useDispatch();
    const [directionsResponse, setDirectionsResponse] = useState({ routes: [] });
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsOptions, setDirectionsOptions] = useState(
        {
            origin: mapSetting.origin,
            waypoints: mapSetting.waypoints,
            destination: mapSetting.destination,
            travelMode: mapSetting.travelMode,
        }
    )
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    if (loadError) {
        console.log(loadError);
    }

   

    useEffect(() => {
        if (mapSetting.status === "notFound") {
            clearRoute();
        }
        setDirectionsOptions({
            origin: mapSetting.origin,
            waypoints: mapSetting.waypoints,
            destination: mapSetting.destination,
            travelMode: mapSetting.travelMode,
        })
    }, [mapSetting.status, mapSetting])

    function directionsCallback(results) {
        console.log("callback ok");
        if (results.status === 'OK') {
            setDirectionsResponse(results);
            dispatch(updateResults(results));
        }
        else {
            console.log(results);
        }
    }

    function clearRoute() {
        setDirectionsResponse({ routes: [] });
    }

    const renderMap = () => {
        return (
            <div className="map-container">
                <GoogleMap
                    center={center}
                    zoom={16}
                    mapContainerStyle={{ width: '100%', height: '600px' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        // mapId:'45b41d76d6b60f19',
                    }}
                // onLoad={(map) => setMap(map)}
                >
                    {mapSetting.status === "notFound" && <DirectionsService options={directionsOptions} callback={directionsCallback} />}
                    {mapSetting.status === "found" && <DirectionsRenderer directions={directionsResponse} />}
                </GoogleMap>
            </div>
        )
    }
    return isLoaded ? renderMap() : <Spinner style={{ position: 'absolute' }} />

}