import { combineReducers } from "redux";
import routePlanReducer from "./routePlanSlice";
import mapSettingReducer  from "./mapSettingSlice";
import searchFieldReducer from "./searchFieldSlice";

export default combineReducers({
    routePlan:routePlanReducer,
    mapSetting:mapSettingReducer,
    searchFieldSettings:searchFieldReducer,
});