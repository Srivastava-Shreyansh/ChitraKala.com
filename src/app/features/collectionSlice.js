import { createSlice } from "@reduxjs/toolkit";
import { Slide, toast } from "react-toastify";
const initialState = {
  items: JSON.parse(localStorage.getItem("collections")) || [],
};

const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addCollection: (state, action) => {
      const alreadyExists = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (!alreadyExists) {
        state.items.push(action.payload);
        localStorage.setItem("collections", JSON.stringify(state.items));
      }
      return state;
    },
    removeCollection: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("collections", JSON.stringify(state.items));
      return state;
    },
    clearCollection: (state) => {
      state.items = [];
      localStorage.removeItem("collections");
      return state;
    },
    addedToast: () => {
      toast.success("Added to Collection!✅", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    },
    removeToast: () => {
      toast.error("Removed from Collection!❌", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    },
  },
});

export const { addCollection, removeCollection, clearCollection, addedToast, removeToast } =
  collectionSlice.actions;
export default collectionSlice.reducer;
