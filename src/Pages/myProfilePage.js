import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Container, CardImg } from "reactstrap";
import Image from "react-graceful-image";
import { Redirect } from "react-router-dom";
import Loading from "../component/Loading";
import UploadPage from "../Pages/UploadPage";

const loading = "wait";
const MyProfilePage = () => {
  const [jwt] = useState(localStorage.getItem("auth_token"));
  const [pic, setPic] = useState([]);
  const [profile, setProfile] = useState([]);

  console.log(jwt);

  let header = {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };

  let profileImages = "https://insta.nextacademy.com/api/v1/images/me";
  let displayPicture = "https://insta.nextacademy.com/api/v1/users/me";

  const requestProfileImages = axios.get(profileImages, header);
  const requestDisplayPicture = axios.get(displayPicture, header);

  useEffect(() => {
    axios
      .all([requestProfileImages, requestDisplayPicture])
      .then(
        axios.spread((...response) => {
          console.log(response);
          const responseProfileImages = response[0];
          const responseDisplayPicture = response[1];
          console.log(responseProfileImages);
          console.log(responseDisplayPicture);
          setPic(responseProfileImages.data);
          setProfile(responseDisplayPicture.data);
        })
      )
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  console.log(pic);
  console.log(profile);

  if (!jwt) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid={true}>
      <Row style={{ marginLeft: "20px" }}>
        <Col style={{ marginLeft: "20px" }}>
          {" "}
          <CardImg
            placeholderColor="pink"
            src={profile.profile_picture}
            style={{
              marginTop: "20px",
              width: "200px",
              borderRadius: "60px"
            }}
          />
          <h2>
            <br></br> <i className="far fa-user"></i>
            <> </>
            My Profile: <b>{profile.username}</b>
            <span> </span> ❣
          </h2>
        </Col>
      </Row>

      <Row>
        {pic.map(pic => {
          return (
            <Col>
              <Image
                src={pic}
                placeholderColor="pink"
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
          );
        })}
      </Row>
      {loading ? <Loading /> : <Image />}
      <UploadPage />
      <footer>By Amanda &hearts;</footer>
    </Container>
  );
};

export default MyProfilePage;
