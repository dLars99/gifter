import React from "react";
import { Link } from "react-router-dom"
import { Card, CardImg, CardBody, ListGroup } from "reactstrap";
import Comment from "./Comment"

const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
            <CardImg top src={post.imageUrl} alt={post.title} />
            <CardBody>
                <Link to={`/posts/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link>
                <p>{post.caption}</p>
            </CardBody>
        </Card>
    );
};

export default Post;