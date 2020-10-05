import React, { useContext, useState } from "react"
import { PostContext } from "../providers/PostProvider"
import { Container, Form, FormGroup, Label, Input } from "reactstrap"

const PostForm = (post) => {

    const { addPost, getAllPosts } = useContext(PostContext)

    const [newPost, setNewPost] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = evt => {
        const updatedState = { ...newPost }
        updatedState[evt.target.name] = evt.target.value
        setNewPost(updatedState)
    }

    const submitNewPost = evt => {
        evt.preventDefault()
        setIsLoading(true)

        const postObject = {
            title: newPost.title,
            imageUrl: newPost.imageUrl,
            caption: newPost.caption,
            userProfileId: 1
        }
        // Current date will be added to the new post by the API
        addPost(postObject)
            .then(() => {
                // Clear fields
                setNewPost({})
                setIsLoading(false)
                getAllPosts()
            })

    }

    return (
        <Container>
            <Form className="m-4">
                <div>
                    <h2>Post New Gif</h2>
                </div>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" id="title" name="title" placeholder="Title this GIF..." maxLength="255" onChange={handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">URL</Label>
                    <Input type="text" id="imageUrl" name="imageUrl" placeholder="URL of the GIF you want to share" maxLength="255" onChange={handleFieldChange} />
                    <div>
                        {newPost.imageUrl
                            ? <img src={newPost.imageUrl} alt="Preview" />
                            : null
                        }
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="caption">Caption (Optional)</Label>
                    <Input type="text" id="caption" name="caption" placeholder="Caption this GIF" maxLength="255" onChange={handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <button type="button" onClick={submitNewPost} disabled={isLoading}>Submit GIF</button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default PostForm