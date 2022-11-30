import { combineReducers } from "redux";
import routePlanReducer from "./routePlanSlice";
import mapSettingReducer  from "./mapSettingSlice";

export default combineReducers({
    routePlan:routePlanReducer,
    mapSetting:mapSettingReducer,
});