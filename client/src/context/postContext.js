import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    const res = await axios.get("http://localhost:8800/api/posts", {
      withCredentials: true,
    });
    console.log(res.data);
    setPosts(res.data)
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, getPosts }}>
      {children}
    </PostContext.Provider>
  );
};
