import React, { useState, useEffect } from "react";
import Image from "react-graceful-image";
import { Container, Row, Col } from "reactstrap";
// import { UncontrolledCarousel } from "reactstrap";
import axios from "axios";

const Images = ({ userId }) => {
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
      .then(result => {
        //console.log(result);
        setUserImages(result.data);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          {userImages.map(userImages => {
            return (
              <Col>
                <Image
                  placeholderColor="pink"
                  src={userImages.url}
                  alt="-"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "15px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    cursor: "pointer",
                    borderRadius: "20px"
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default Images;
