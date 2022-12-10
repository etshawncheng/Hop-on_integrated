import { combineReducers } from "redux";
import routePlanReducer from "./routePlanSlice";
import mapSettingReducer  from "./mapSettingSlice";
import searchFieldReducer from "./searchFieldSlice";
import historyRouteReducer from "./historyRouteSlice";

export default combineReducers({
    routePlan:routePlanReducer,
    mapSetting:mapSettingReducer,
    searchFieldSettings:searchFieldReducer,
    history: historyRouteReducer,
});