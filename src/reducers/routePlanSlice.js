
import { createSlice } from "@reduxjs/toolkit";

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
let serverData = {
  versions: [
    // {
    //   userId: 0,
    //   editCount:0,
    //   final: true,
    //   routeChanged: false,
    //   route: null,
    //   vote: null,
    // },
  ]
};



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
      const { curVerIndex, listId, newView } = action.payload;
      state.versions[curVerIndex].route[listId].views.push(newView);
      state.versions[curVerIndex].routeChanged = true;
    },
    //更新景點
    updateView(state, action) {
      const { curVerIndex, listId, viewId, updatedView } = action.payload;
      if (viewId !== null) {
        state.versions[curVerIndex].route[listId].views.splice(viewId, 1, updatedView);
        state.versions[curVerIndex].routeChanged = true;
      }
      else {
        state.versions[curVerIndex].route[listId].views.push(updatedView);
        state.versions[curVerIndex].routeChanged = true;
      }
    },
    //刪除景點
    removeView(state, action) {
      const { curVerIndex, listId, viewId } = action.payload;
      state.versions[curVerIndex].route[listId].views.splice(viewId, 1);
      state.versions[curVerIndex].routeChanged = true;
    },
    //交換景點順序
    exchangeViewsOrder(state, action) {
      const { curVerIndex, listId, updatedViews } = action.payload;
      state.versions[curVerIndex].route[listId].views = updatedViews;
      state.versions[curVerIndex].routeChanged = true;
    },
    // setRoute(state, action) {
    //   const { route } = action.payload;
    //   state[0].route = route;
    // },
    updateVersion(state, action) {
      const { version, userId, editCount} = action.payload;
      const checkExists = state.versions.map(x => { return x.userId == userId ? true : false }) 
      if (checkExists.includes(true)){
        const index = checkExists.indexOf(true);
        if(state.versions[index].editCount < editCount){
          state.versions[index] = version;
        }
      }
      else{
        state.versions.push(version)
        console.log('成功加進去了')
      }
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

export const { addView, updateView, removeView, exchangeViewsOrder, updateResponse, updateResponseStatus, getState, setRoute, updateVersion} = routePlanSlice.actions;

export function formMapPlan(views) {
  const origin = views[0].attraction_pluscode;
  const destination = views[views.length - 1].attraction_pluscode;
  const waypoints = (views.length > 2 ? views.slice(1, -1).map(getWaypoints) : null);
  return { origin, destination, waypoints };
}

export default routePlanSlice.reducer; 