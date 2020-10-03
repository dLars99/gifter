import React from "react";
import "./App.css";
import { PostProvider } from "./providers/PostProvider";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import SearchPost from "./components/SearchPost"

function App() {
  return (
    <div className="App">
      <PostProvider>
        <PostForm />
        <SearchPost />
        <PostList />
      </PostProvider>
    </div>
  );
}

export default App;