import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //reducer function to handle the data we submit
    postAdded(state, action) {
      state.push(action.payload); //here not mutating the state, immer js useage
      //here not mutating the state immer js creates new state underneath
      //this will work only inside createSlice
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

{
  /*when we write this postAdded function then create slice automatically generates an action
  creator function with the same name*/
}

{
  /*when we exposrt our actions we actually exporting the action creator function that is 
  automatically created*/
}
