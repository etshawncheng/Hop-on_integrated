import { connect } from "react-redux";
import RouteUI from "../components/RouteUI";

const mapStateToProps = (state) => ({
    routePlan: state.routePlan, //把state 的views作為Props傳給子元素
})

export default connect(mapStateToProps)(RouteUI);