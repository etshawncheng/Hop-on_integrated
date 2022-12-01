import { createSlice } from "@reduxjs/toolkit";
import url from '../url';

let t = [
  {
    //景點List
    views: [
      {
        attraction_name: "都蘭遺址",
        attraction_pluscode: "7QJ3V6GF+RWG",
      },
      {
        attraction_name: '月光小棧',
        attraction_pluscode: "7QJ3V6M4+J5R",
      },
      {
        attraction_name: "臺東美術館",
        attraction_pluscode: "7QJ3Q47X+PX",
      },
      {
        attraction_name: "台東糖廠文創園區",
        attraction_pluscode: "7QJ3Q49G+2Q",

      },
      {
        attraction_name: "臺東拾光大道",
        attraction_pluscode: "7QJ3Q4JJ+H2",
      },
      {
        attraction_name: "卑南遺址公園",
        attraction_pluscode: "7QJ3Q4R8+Q8",

      }
    ],
  },
  {
    views: [
      {
        attraction_name: '南王部落',
        attraction_pluscode: "7QJ3Q4Q7+HW8",

      },
      {
        attraction_name: "太平溪人工濕地",
        attraction_pluscode: "7QJ3Q3RJ+JWC",

      },

      {
        attraction_name: '天際航空──飛行啟蒙基地(飛行學校)',
        attraction_pluscode: "7QJ3W4WP+8JM",

      },
    ],
  }]
let serverData = [{
  id:0,
  final: true,
  routeChanged: false,
  route: null
},
{

}
];



function getWaypoints(view) {
  return ({
    location: view.attraction_pluscode,
    stopover: true,
  })
}

const routePlanSlice = createSlice({
  name: "routePlan",
  initialState: serverData,
  reducers: {
    //新增景點
    addView(state, action) {
      const { listId, name } = action.payload;
  state[0].route[listId].views.push({ attraction_name: name, attraction_pluscode: "", finished: false });
      state[0].routeChanged = true;
    },
    //更新景點
    updateView(state, action) {
      const { listId, viewId, name } = action.payload;
      state[0].route[listId].views.splice(viewId, 1, { attraction_name: name, attraction_pluscode: "", finished: false });
      state[0].routeChanged = true;
    },
    //刪除景點
    removeView(state, action) {
      const { listId, viewId } = action.payload;
      state[0].route[listId].views.splice(viewId, 1);
      state[0].routeChanged = true;
    },
    //交換景點順序
    exchangeViewsOrder(state, action) {
      const { listId, updatedViews } = action.payload;
      state[0].route[listId].views = updatedViews;
      state[0].routeChanged = true;
    },
    setRoute(state, action) {
      const { route } = action.payload;
      state[0].route = route;
    }
    //更新導航資料
    // updateResponse(state, action){
    //   const {listId, updatedResponse} = action.payload;
    //   state[listId].response = updatedResponse;
    // },
    // //更新導航狀態
    // updateResponseStatus(state, action){
    //   const {listId, updatedResStat} = action.payload;
    //   state[listId].responseStatus = updatedResStat;
    // }
  },
});

export const { addView, updateView, removeView, exchangeViewsOrder, updateResponse, updateResponseStatus, getState, setRoute } = routePlanSlice.actions;

export function formMapPlan(views) {
  const origin = views[0].attraction_pluscode;
  const destination = views[views.length - 1].attraction_pluscode;
  const waypoints = (views.length > 2 ? views.slice(1, -1).map(getWaypoints) : null);
  return { origin, destination, waypoints };
}

export default routePlanSlice.reducer; 