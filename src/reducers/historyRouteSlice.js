import { createSlice } from "@reduxjs/toolkit";

const initialState = {teams:[{
    teamId:null,
    setTime:null,
}]};

const historyRouteSlice = createSlice({
    name: 'history',
    initialState: initialState,
    reducers: {
        init(state, action) {
            const { init } = action.payload;
            state.teams = init;
        },
        addHistory(state, action) {
            const { history } = action.payload;
            state.push(history);
        }
    }
})

export const { addHistory, init } = historyRouteSlice.actions;

export default historyRouteSlice.reducer;