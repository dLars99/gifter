import React from "react";
import { Card, CardImg, CardBody, ListGroup } from "reactstrap";
import Comment from "./Comment"

const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
            <CardImg top src={post.imageUrl} alt={post.title} />
            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>{post.caption}</p>
                {(post.comments.length !== 0)
                    ? <ListGroup>
                        {post.comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </ListGroup>
                    : null
                }
            </CardBody>
        </Card>
    );
};

export default Post;