import React, { useState } from "react";
import { userProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const { getToken } = useContext(userProfileContext);

    const getAllPosts = () => {
        getToken().then((token) =>
        fetch("/api/post/getwithcomments", {
            method: "GET",
            Authorization: `Bearer ${token}`
        }).then((res) => res.json())
            .then(setPosts));
    };

    const addPost = (post) => {
        return getToken().then((token) => {
        fetch("/api/post", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post),
        })});
    };

    const searchPosts = (searchTerm) => {
        getToken().then((token) =>
        fetch(`/api/post/search?q=${searchTerm}&sortDesc=false`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then(setPosts));
    };

    const getPost = (id) => {
        getToken().then((token) => {
        return fetch(`/api/post/${id}/getwithcomments`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())});
    };

    return (
        <PostContext.Provider value={{ posts, setPosts, getAllPosts, addPost, searchPosts, getPost }}>
            {props.children}
        </PostContext.Provider>
    );
};