import React, { useState } from "react";
import { Button, Form } from "reactstrap";

const CommentBox = ({ heading }) => {
  //post comment using 2 state to avoid confusion
  const [postComment, setPostComment] = useState([]);
  const [input, setInput] = useState("");

  const handleCommentSubmit = e => {
    e.preventDefault();
    console.log(postComment);
    const addNewComment = [];
    addNewComment.push(input);
    setPostComment(addNewComment);
    setInput([]);
  };
  // console.log(postComment);

  const handleCommentInput = comment => {
    setInput(comment.target.value);
  };
  // console.log(input);

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
        {postComment.map(post => {
          return <p>{post}</p>;
        })}
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
    </Form>
  );
};
export default CommentBox;
