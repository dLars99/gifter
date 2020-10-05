import React, { useState, useEffect } from "react"
import { ListGroupItem } from "reactstrap"

const Comment = ({ comment }) => {

    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        const getUser = async () => {
            const userData = await fetch(`/api/userprofile/${comment.userProfileId}`)
            const dataJson = await userData.json()
            setUserProfile(dataJson)
        }
        getUser()
    }, [])


    return (
        <ListGroupItem>
            <blockquote>{comment.message}</blockquote>
            <cite>{userProfile.name}</cite>
        </ListGroupItem>
    )
}

export default Comment