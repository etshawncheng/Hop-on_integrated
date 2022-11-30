import { createSlice } from "@reduxjs/toolkit";

const serverData = [{
  final: true,
  routeChanged: false,
  route: [
    {
      title: "day1",
      //景點List
      views: [
        {
          name: "都蘭遺址",
          pluscode: "7QJ3V6GF+RWG",
          finished: false,
        },
        {
          name: '月光小棧',
          pluscode: "7QJ3V6M4+J5R",
          finished: false,
        },
        {
          name: "臺東美術館",
          pluscode: "7QJ3Q47X+PX",
          finished: false,
        },
        {
          name:"台東糖廠文創園區",
          pluscode:"7QJ3Q49G+2Q",
          finished: false,
        },
        {
          name:"臺東拾光大道",
          pluscode:"7QJ3Q4JJ+H2",
          finished: false,
        },
        {
          name:"卑南遺址公園",
          pluscode:"7QJ3Q4R8+Q8",
          finished: false,
        }
      ],
    },
    {
      title: "day2",
      views: [
        {
          name: '南王部落',
          pluscode: "7QJ3Q4Q7+HW8",
          finished: false,
        },
        {
          name: "太平溪人工濕地",
          pluscode: "7QJ3Q3RJ+JWC",
          finished: false,
        },

        {
          name: '天際航空──飛行啟蒙基地(飛行學校)',
          pluscode: "7QJ3W4WP+8JM",
          finished: false,
        },
      ],
    }]
}
];

function getWaypoints(view) {
  return ({
    location: view.pluscode,
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
      if (name === "臺東美術館") {
        state[0].route[listId].views.push({ name: name,pluscode:'7QJ3Q47X+PX', finished: false });
        state[0].routeChanged = true;
      }
      else {
        state[0].route[listId].views.push({ name: name, pluscode:"",finished: false });
        state[0].routeChanged = true;
      }
    },
    //更新景點
    updateView(state, action) {
      const { listId, viewId, name } = action.payload;
      state[0].route[listId].views.splice(viewId, 1, { name: name,  pluscode:"",  finished: false });
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

export const { addView, updateView, removeView, exchangeViewsOrder, updateResponse, updateResponseStatus, getState } = routePlanSlice.actions;

export function formMapPlan(views) {
  const origin = views[0].pluscode;
  const destination = views[views.length - 1].pluscode;
  const waypoints = (views.length > 2 ? views.slice(1, -1).map(getWaypoints) : null);
  return { origin, destination, waypoints };
}

export default routePlanSlice.reducer; 