import Post from "../post/Post";
import "./posts.scss";
import { useContext } from "react";
import { PostContext } from "../../context/postContext";

const Posts = ({userId}) => {

  const { posts } = useContext(PostContext);

  if (!posts){
    return <div>Loading..</div>
  }

  return (
    <div className="posts">
      {posts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
