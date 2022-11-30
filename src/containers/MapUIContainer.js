import { connect } from "react-redux";
import mapUI from "../components/MapUI";
import { updateMap, updateMapPlan, updateTravelMode, updateResults } from "../reducers/mapSettingSlice"

const mapStateToProps = (state) => ({
   mapSetting: state.mapSetting, //把state 的views作為Props傳給子元素
})
const mapDispatchToProps = {updateMap, updateMapPlan, updateTravelMode, updateResults}

export default connect(mapStateToProps, mapDispatchToProps)(mapUI);