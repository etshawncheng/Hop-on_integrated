import { connect } from "react-redux";
import ViewSearchField from "../components/ViewSearchField";
import { toggleShow, updateFoundAttractions } from "../reducers/searchFieldSlice";
// import { updateMap, updateMapPlan,  updateResults } from "../reducers/mapSettingSlice"

const mapStateToProps = (state) => ({
    searchFieldSettings: state.searchFieldSettings, //把state 的views作為Props傳給子元素
})
const mapDispatchToProps = {toggleShow, updateFoundAttractions}
// const mapDispatchToProps = {updateMap, updateMapPlan, updateResults}

export default connect(mapStateToProps)(ViewSearchField);