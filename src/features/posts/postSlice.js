import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0,
    },
  },
];

{
  /*without duplicating logic in every component we use prepae call back */
}
{
  /**
  prepare call back,
        generate uniique ids,
        format the data,
        return the object with the payload 
*/
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //reducer function to handle the data we submit
    postAdded: {
      reducer(state, action) {
        state.push(action.payload); //here not mutating the state, immer js useage
        //here not mutating the state immer js creates new state underneath
        //this will work only inside createSlice
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffe: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const exsistingPost = state.find((post) => post.id === postId);
      if (exsistingPost) exsistingPost.reactions[reaction]++;
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

{
  /*when we write this postAdded function then create slice automatically generates an action
  creator function with the same name*/
}

{
  /*when we exposrt our actions we actually exporting the action creator function that is 
  automatically created*/
}
