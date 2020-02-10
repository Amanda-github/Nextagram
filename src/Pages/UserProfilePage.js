import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-graceful-image";
import Loading from "../component/Loading";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const loader = "wait";
const UserProfilePage = ({ user }) => {
  const { id } = useParams();
  console.log(id);
  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
      .then(result => {
        console.log(result);
        setProfileImages(result.data);
      });
  }, [id]);

  return (
    <>
      <Container fluid={true}>
        <Row style={{ marginLeft: "20px" }}>
          {" "}
          {user.map(user => {
            if (user.id == id) {
              return (
                <>
                  <Col style={{ marginLeft: "20px" }}>
                    <Image
                      placeholderColor="white"
                      src={user.profileImage}
                      style={{
                        marginTop: "20px",
                        width: "200px",
                        borderRadius: "60px"
                      }}
                    />
                    <h2>
                      <br></br> <i className="far fa-user"></i>
                      <> </>
                      Profile Name : <b>{user.username}</b>
                    </h2>
                  </Col>
                </>
              );
            }
          })}
        </Row>
        <Row>
          {profileImages.map(profile => {
            return (
              <>
                <Col>
                  <Image
                    src={profile}
                    placeholderColor="lightpink"
                    alt="-"
                    style={{
                      marginTop: "40px",
                      marginBottom: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "500px",
                      height: "500px",
                      borderRadius: " 40px"
                    }}
                  />
                </Col>
              </>
            );
          })}
        </Row>
        {loader ? <Loading /> : <Image />}
        <footer>By Amanda &hearts;</footer>
      </Container>
    </>
  );
};

export default UserProfilePage;
