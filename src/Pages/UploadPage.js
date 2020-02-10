import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Button
} from "reactstrap";
import axios from "axios";

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmitFile = e => {
    e.preventDefault();
    console.log(imageFile);

    let JWT = localStorage.getItem("auth_token");
    let formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: {
          Authorization: `Bearer ${JWT}`
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.success) {
          setMessage("Uploaded successfully ⭐");
          setPreviewImage(null);
          setImageFile(null);
        } else {
          setMessage("Error, please try again 😔");
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const handleImageInput = image => {
    //handle preview and upload
    let upload = image.target.files[0];
    let newUpload = URL.createObjectURL(upload);

    setImageFile(upload);
    setPreviewImage(newUpload);

    console.log(image);
  };

  return (
    <>
      <h3 style={{ paddingBottom: "80px" }}>
        <i class="far fa-images"></i> <span> </span>
        <b>Upload your photos here </b>
      </h3>
      <Container
        className="border border-dark"
        style={{
          marginBottom: "50px",
          width: "500px",
          height: "500px",
          borderRadius: "20px",
          padding: "0px"
        }}
      >
        {previewImage ? (
          message ? (
            <FormText style={{ marginTop: " 250px" }}>
              <b>{message}</b>
            </FormText>
          ) : (
            <img
              src={previewImage}
              alt="uploaded images"
              style={{
                marginBottom: "50px",
                width: "500px",
                height: "500px",
                borderRadius: "20px",
                marginLeft: "0px"
              }}
            />
          )
        ) : (
          <FormText style={{ marginTop: " 250px" }}>
            <b>
              Preview your upload <span></span>📌
            </b>
          </FormText>
        )}
      </Container>
      <Container
        fluid={true}
        style={{
          marginBottom: "40px"
        }}
      >
        <Form onSubmit={handleSubmitFile}>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  type="file"
                  name="image-file"
                  onChange={handleImageInput}
                  style={{ paddingLeft: "230px", cursor: "pointer" }}
                />

                <FormText color="muted" style={{ paddingLeft: "50px" }}>
                  Make sure the image being uploaded is a supported format.
                </FormText>
              </FormGroup>
            </Col>
            <Col>
              <> </>
              <Button
                type="submit"
                color="info"
                style={{ borderRadius: "10px" }}
              >
                <i class="fas fa-file-upload"></i>
                <span> </span>
                <b>Upload</b>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default UploadPage;
