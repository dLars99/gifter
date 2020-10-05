import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        return fetch("/api/post/getwithcomments")
            .then((res) => res.json())
            .then(setPosts);
    };

    const addPost = (post) => {
        return fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
    };

    const searchPosts = (searchTerm) => {
        return fetch(`/api/post/search?q=${searchTerm}&sortDesc=false`)
            .then((res) => res.json())
            .then(setPosts);
    };


    return (
        <PostContext.Provider value={{ posts, setPosts, getAllPosts, addPost, searchPosts }}>
            {props.children}
        </PostContext.Provider>
    );
};