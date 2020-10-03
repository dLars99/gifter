import React, { useContext } from "react"
import { PostContext } from "../providers/PostProvider"

const SearchPost = () => {

    const { posts, setPosts, getAllPosts } = useContext(PostContext)

    const handleSearchChange = evt => {
        return fetch(`/api/post/search?q=${evt.target.value}&sortDesc=false`)
            .then((res) => res.json())
            .then(setPosts);
    }

    return (
        <section>
            <label htmlFor="search">Search Posts</label>
            <input type="text" id="search" name="search" placeholder="Enter search term..."
                onChange={handleSearchChange} />
            <hr />
        </section>
    )
}

export default SearchPost