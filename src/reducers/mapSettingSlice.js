import { createSlice } from "@reduxjs/toolkit";

const defaultSetting = {
    map:  /** @type google.maps.Map */ (null),
    origin:null,
    destination:null,
    waypoints:null,
    travelMode: 'DRIVING',
    results: null,
    status: 'notFound',
}


const mapSettingSlice = createSlice({
    name:"mapSetting",
    initialState: defaultSetting,
    reducers:{
        updateMap(state, action){
            const map = action.payload;
            state.map = map;
        },
        updateMapPlan(state, action){
            const {origin, destination, waypoints} = action.payload;
            state.origin = origin;
            state.destination = destination;
            state.waypoints = waypoints;
            state.status = 'notFound';
        },
        updateTravelMode(state, action){
            const travelMode = action.payload;
            state.travelMode = travelMode;
        },
        updateResults(state, action){
            const results = action.payload;
            state.results = results;
            state.status = 'found';
        }
    }
})
export const { updateMap, updateMapPlan, updateTravelMode, updateResults } = mapSettingSlice.actions; 

export default mapSettingSlice.reducer;