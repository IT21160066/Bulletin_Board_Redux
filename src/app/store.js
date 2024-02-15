import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

/**configureStore from @reduxjs/toolkit:
 * This function is used to create a Redux store, which is the central state management mechanism in your application. */

/**A reducer is a pure function that takes the current state and an action object as input,
 * and returns the updated state based on the action type and payload. */

/**posts: The state and logic for managing posts will be managed by the postReducer. */
/**users: The state and logic for managing users will be managed by the userReducer. */

/**Redux: A predictable state management library for JavaScript applications.
Store: A single global object that holds the entire application state.
Reducer: A pure function that updates the state based on actions.
Slice: A feature-specific part of the state managed by a dedicated reducer. */
