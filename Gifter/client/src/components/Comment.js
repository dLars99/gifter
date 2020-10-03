import React, { useState, useEffect } from "react"
import { ListGroupItem } from "reactstrap"

const Comment = ({ comment }) => {

    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        return fetch(`/api/userprofile/${comment.userProfileId}`)
            .then((res) => res.json())
            .then(setUserProfile)

    }, [])


    return (
        <ListGroupItem>
            <blockquote>{comment.message}</blockquote>
            <cite>{userProfile.name}</cite>
        </ListGroupItem>
    )
}

export default Comment