import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //idle, loading, succeeded, failed
  error: null,
};

//prefix for the genrated action type
//payload creator callback
//function should return a promise that contains some data or rejected promise with an error

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  //the payload creator function
  const response = await axios.get(POSTS_URL);
  return response.data;
});

// 1st argument - action type prefix
// This is used to generate unique action types for this async thunk.
//It helps differentiate actions related to fetching posts from other actions in the application.

/**This async thunk can be dispatched like any other action in Redux. When dispatched, 
 * it will trigger the asynchronous logic defined in the payload creator function.
Redux Toolkit's createAsyncThunk automatically generates three action types: 
<actionTypePrefix>/pending, <actionTypePrefix>/fulfilled, and <actionTypePrefix>/rejected. 
These action types represent the different stages of the async operation (pending, fulfilled with data, or rejected with an error). */

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialState) => {
    const response = await axios.post(POSTS_URL, initialState);
    return response.data;
  }
);

//epresents the initial data or payload that you want to send to the server when creating a new post.

/*The second argument to axios.post is initialState,
which presumably contains the data for the new post to be added.*/

/**In the provided example, the action type prefix is "posts/addNewPost".
 * This prefix helps to differentiate actions related to adding new posts
 * from actions related to other parts of the application. By including a
 * specific prefix related to the feature or slice of state being managed
 * (in this case, "posts"), it ensures that the generated action types are
 * unique and specific to the async thunk being created. */

//Action types are typically strings that describe the action being performed
//in a Redux application.

/*The return value of the payload creator function is a promise. 
This promise resolves with the data returned by the API (response.data) when the HTTP request is successful.
If there is an error during the HTTP request, the promise will be rejected with an error.*/

/*without duplicating logic in every component we use prepae call back */

/**
  prepare call back,
        generate uniique ids,
        format the data,
        return the object with the payload 
*/

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      // This is a reducer function that handles adding a new post to the state
      reducer(state, action) {
        // this is the actual function that modifies the state.
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        // This is a function that prepares the payload for the postAdded action.
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
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      // This is a reducer function that handles adding reactions to a post
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  /**extraReducers is a function provided by createSlice that allows adding additional case reducers to handle actions outside of the slice itself.
   * It takes a single argument builder, which is an object that lets us define case reducers. */
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
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

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

//createAsyncThunk: Handles asynchronous actions like fetching and adding posts
