import { connect } from "react-redux";
import Member from "../components/Member";
// import { updateMap, updateMapPlan,  updateResults } from "../reducers/mapSettingSlice"

const mapStateToProps = (state) => ({
  history: state.history,//把state 的views作為Props傳給子元素
})
// const mapDispatchToProps = {updateMap, updateMapPlan, updateResults}

export default connect(mapStateToProps)(Member);