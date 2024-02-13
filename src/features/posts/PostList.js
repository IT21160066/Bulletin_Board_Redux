import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts); //shape of the state changes we just need to change it in the slice
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post, index) => (
      <PostsExcerpt key={post.id} post={post} index={index} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
