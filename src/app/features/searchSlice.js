import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        activeTab: "photos",
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        setQuery(state, action){
            state.query = action.payload;
        },
        setActiveTab(state, action){
            state.activeTab = action.payload;
        
        },
        setResults(state, action){
            state.results = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading(state){
            state.loading = true;
            state.error = null;
            
        },
        setError(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        clearResults(state){
            state.results = [];
            state.loading = false;
            state.error = null;
        },
    }
})

export const{
    setQuery, 
    setActiveTab, 
    setResults, 
    setLoading, 
    setError, 
    clearResults} = searchSlice.actions;

export default searchSlice.reducer;