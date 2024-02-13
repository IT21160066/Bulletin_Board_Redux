import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //idle, loading, succeeded, failed
  errror: null,
};

//prefix for the genrated action type
//payload creator callback
//function should return a promise that contains some data or rejected promise with an error

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

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
        state.posts.push(action.payload); //here not mutating the state, immer js useage
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
      const exsistingPost = state.posts.find((post) => post.id === postId);
      if (exsistingPost) exsistingPost.reactions[reaction]++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

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

/**builder parameter is an object that let us define additional case reducers that run in response to the
 * actions defined outside of the slice*/
