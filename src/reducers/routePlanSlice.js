import { createSlice } from "@reduxjs/toolkit";

const serverData = [
    {
        title: "day1",
        //景點List
        views: [
          {
            name: "台北101",
            finished: false,
          },
          {
            name: "中正紀念堂",
            finished: false,
          },
          {
            name: "台北植物園",
            finished: false,
          },
          {
            name: "台北車站",
            finished: false,
          }
        ],
      },
      {
        title: "day2",
        views: [
          {
            name: '阿底旦文化故事館',
            finished: false,
          },
          {
            name: '大武彩虹街',
            finished: false,
          },
          {
            name: '南田部落',
            finished: false,
          },
          {
            name: '南田海岸親水公園',
            finished: false,
          },
          {
            name: '森永部落',
            finished: false,
          },
          {
            name: 'VuVu野菜農園',
            finished: false,
          }
        ],
      }
];

function getWaypoints(view){
  return ({
    location: view.name,
    stopover: true,
  })
}

const routePlanSlice = createSlice({
    name:"routePlan",
    initialState: serverData,
    reducers:{
        //新增景點
        addView(state, action){
          const { listId, name } = action.payload;
          state[listId].views.push({ name:name, finished: false});
          state[listId].responseStatus = "changed";
        },
        //更新景點
        updateView(state, action){
          const { listId, viewId, name} = action.payload;
          state[listId].views[viewId] = {name: name, finished:false};
          state[listId].responseStatus = "changed";
        },
        //刪除景點
        removeView(state, action){
          const { listId, viewId } = action.payload;
          state[listId].views.splice(viewId,viewId);
          state[listId].responseStatus = "changed";
        },
        //交換景點順序
        exchangeViewsOrder(state, action){
          const {listId, updatedViews} = action.payload;
          state[listId].views = updatedViews;
          state[listId].responseStatus = "changed";
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

export const { addView, updateView, removeView, exchangeViewsOrder, updateResponse, updateResponseStatus, getState} = routePlanSlice.actions;

export function formMapPlan(views){
  const origin = views[0].name;
  const destination = views[views.length -1].name;
  const waypoints = (views.length > 2 ? views.slice(1, -1).map(getWaypoints): null);
  return {origin, destination, waypoints};
}

export default routePlanSlice.reducer; 