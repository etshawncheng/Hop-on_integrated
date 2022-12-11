import { connect } from "react-redux";
import VotePanel from "../components/VotePanel";

const mapStateToProps = (state) => ({
    routePlan: state.routePlan, //把state 的views作為Props傳給子元素
})



export default connect(mapStateToProps)(VotePanel);