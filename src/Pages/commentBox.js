import React from "react";
import { Button } from "reactstrap";

const CommentBox = ({ heading }) => {
  return (
    <>
      <div>
        <br></br>
        <label>
          <i className="far fa-comment-alt"></i>
          <> </>
          <b>{heading}</b> <> </>
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
    </>
  );
};

export default CommentBox;
