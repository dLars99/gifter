import React, { useContext } from "react"
import { PostContext } from "../providers/PostProvider"
import { Container, Label, Input } from "reactstrap"

const SearchPost = () => {

    const { getAllPosts, searchPosts } = useContext(PostContext)

    const handleSearchChange = evt => {
        searchPosts(evt.target.value)
    }

    return (
        <>
            <Container>
                <Label for="search">Search Posts</Label>
                <Input type="text" id="search" name="search" placeholder="Enter search term..."
                    onChange={handleSearchChange} />
            </Container>
            <hr />
        </>
    )
}

export default SearchPost