import React from "react";
import { Container, Card, CardTitle, CardImg, Button } from "reactstrap";
import CommentBox from "./commentBox";
import Images from "../Containers/userImage";
import Loading from "../component/Loading";
import UserProfilePage from "../Pages/UserProfilePage";
import { Link, Route } from "react-router-dom";

const title = "Comment";
const loader = "wait";
const HomePage = ({ user }) => {
  return (
    <>
      <Container fluid="sm">
        {user.map(user => {
          //console.log(user.id);
          return (
            <Card
              body
              style={{
                width: "750px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "20px"
              }}
            >
              <div>
                {" "}
                <CardTitle style={{ size: "200px" }}>
                  <h2> {user.username}</h2>
                </CardTitle>
              </div>
              <div>
                <CardImg
                  style={{
                    marginBottom: "20px",
                    borderRadius: "10px",
                    width: "600px"
                  }}
                  src={user.profileImage}
                />
              </div>
              <Button
                tag={Link}
                to={`/users/${user.id}`}
                size="lg"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "600px",
                  backgroundColor: "LavenderBlush",
                  color: "black",
                  cursor: "pointer"
                }}
              >
                <>
                  {" "}
                  <i className="far fa-user-circle"></i>
                </>
                <> </>
                View Profile
              </Button>
              <CommentBox heading={title} />
              <Images userId={user.id} />
              {loader ? <Loading /> : <Images userId={user.id} />}
            </Card>
          );
        })}
        <footer>By Amanda &hearts;</footer>
      </Container>
      {loader ? <Loading /> : <HomePage user={user} />}
      <Route path="/users/:id">
        <UserProfilePage user={user} />
      </Route>
    </>
  );
};

export default HomePage;
