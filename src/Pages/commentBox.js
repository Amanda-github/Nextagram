import React, { useState } from "react";
import { Button, Form } from "reactstrap";

const CommentBox = ({ heading }) => {
  //post comment
  const [postComment, setPostComment] = useState([]);
  const addNewComment = [...postComment];

  const handleCommentSubmit = e => {
    e.preventDefault();
    console.log(postComment);
    addNewComment.push([]);
    setPostComment("");
  };

  const handleCommentInput = comment => {
    setPostComment(comment.target.value);
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <div>
        <br></br>
        <label>
          <i className="far fa-comment-alt"></i>
          <> </>
          <b>{heading}</b>
        </label>
        <br></br>
        <textarea
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            paddingLeft: "10px",
            paddingTop: "10px"
          }}
          cols="60"
          rows="4"
          placeholder="Write something ..."
          color="black"
          onChange={handleCommentInput}
        />
      </div>
      <div>
        <Button
          type="submit"
          style={{
            marginLeft: "600px",
            marginBottom: "30px",
            borderRadius: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
            width: "100px",
            backgroundColor: "LavenderBlush",
            color: "black",
            cursor: "pointer"
          }}
        >
          {" "}
          <i class="fas fa-plus-circle"></i>
          <span> </span>
          <b>Post</b>
        </Button>
      </div>
      <>
        {addNewComment.map(post => {
          return <li>{post}</li>;
        })}
      </>
    </Form>
  );
};
export default CommentBox;
