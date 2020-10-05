import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Post from "./Post"

const UserPosts = () => {

    const [userProfile, setUserProfile] = useState()

    const { id } = useParams()

    useEffect(() => {
        const getUser = async () => {
            console.log(id)
            const userData = await fetch(`/api/userprofile/${id}/getwithposts`)
            const dataJson = await userData.json()
            setUserProfile(dataJson)
        }
        getUser()
    }, [])

    if (!userProfile) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {(userProfile.posts)
                        ? userProfile.posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                        : null}
                </div>
            </div>
        </div>
    )

}

export default UserPosts