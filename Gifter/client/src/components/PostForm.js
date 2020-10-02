import React, { useContext, useState } from "react"
import { PostContext } from "../providers/PostProvider"

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
        <section>
            <form>
                <div>
                    <h2>Post New Gif</h2>
                </div>
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title this GIF..." maxLength="255" onChange={handleFieldChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="imageUrl">URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="URL of the GIF you want to share" maxLength="255" onChange={handleFieldChange} />
                    <div>
                        {newPost.imageUrl
                            ? <img src={newPost.imageUrl} alt="Preview" />
                            : null
                        }
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="caption">Caption (Optional)</label>
                    <input type="text" id="caption" name="caption" placeholder="Caption this GIF" maxLength="255" onChange={handleFieldChange} />
                </fieldset>
                <fieldset>
                    <button type="button" onClick={submitNewPost} disabled={isLoading}>Submit GIF</button>
                </fieldset>
            </form>
        </section>
    )
}

export default PostForm