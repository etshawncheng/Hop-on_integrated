import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    curVerIndex: 0,
    listId:null,
    viewId:null,
    show:false,
    foundAttractions:null,
}

const searchFieldSlice = createSlice({
    name:'searchFieldSettings',
    initialState:initalState,
    reducers:{
        toggleShow(state, action){
            const bool = action.payload;
            state.show = bool;
        },
        updateFoundAttractions(state,action){
            const { foundAttractions } = action.payload;
            state.foundAttractions = foundAttractions;
        },
        updateIdList(state, action){
            const {curVerIndex, listId, viewId} = action.payload;
            state.curVerIndex= curVerIndex;
            state.listId = listId;
            state.viewId = viewId;
        }
    }
});

export const {toggleShow, updateFoundAttractions, updateIdList} = searchFieldSlice.actions;
export default searchFieldSlice.reducer;


