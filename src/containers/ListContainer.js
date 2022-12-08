import { connect } from "react-redux";
import List from "../components/List";
// import { updateMap, updateMapPlan,  updateResults } from "../reducers/mapSettingSlice"

const mapStateToProps = (state) => ({
   mapSetting: state.mapSetting, //把state 的views作為Props傳給子元素
})
// const mapDispatchToProps = {updateMap, updateMapPlan, updateResults}

export default connect(mapStateToProps)(List);