import { createSlice } from "@reduxjs/toolkit";

const initalState = {
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
            const {listId, viewId} = action.payload;
            state.listId = listId;
            state.viewId = viewId;
        }
    }
});

export const {toggleShow, updateFoundAttractions, updateIdList} = searchFieldSlice.actions;
export default searchFieldSlice.reducer;


