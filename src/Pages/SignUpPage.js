import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from "reactstrap";
import axios from "axios";

const SignUpPage = ({ SignUpUser }) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [delay, setDelay] = useState(null);
  const enable =
    username.length > 0 && email.length > 0 && newPassword.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username);
    setUsername("");
    console.log(email);
    setEmail("");
    console.log(newPassword);
    setNewPassword("");
    console.log(confirmPassword);
    setConfirmPassword("");
    SignUpUser(username, email, newPassword, confirmPassword);

    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: `${username}`,
        email: `${email}`,
        password: `${newPassword}`
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error.response);
      });
  };

  //validate username//
  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log(newUsername);
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };
  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 2000);

    setDelay(newDelay);
  };

  const inputName = () => {
    if (!username.length) {
      return null;
    }
    if (username.length <= 10) {
      return { invalid: true };
    }
    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const nameFeedback = () => {
    if (!username.length) {
      return null;
    }
    if (username.length <= 10) {
      return (
        <FormFeedback invalid>Must be at least 10 characters</FormFeedback>
      );
    }
    if (usernameValid) {
      return <FormFeedback valid>Username is unique !! </FormFeedback>;
    } else {
      return (
        <FormFeedback invalid>Be creative with your Username !!</FormFeedback>
      );
    }
  };

  //Validate Email//
  const handleEmailInput = email => {
    setEmail(email);
  };

  const getEmailValid = () => {
    let format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.length) {
      return null;
    }
    if (format.test(email)) {
      return { valid: true };
    } else {
      return {
        invalid: true
      };
    }
  };
  const inputPassword = () => {
    if (!newPassword.length) {
      return null;
    }
    if (newPassword.length <= 6) {
      return { invalid: true };
    } else {
      return { valid: true };
    }
  };

  const passwordFeedback = () => {
    if (!newPassword.length) {
      return null;
    }
    if (newPassword.length <= 6) {
      return <FormFeedback invalid>Password is too WEAK</FormFeedback>;
    } else {
      return (
        <FormFeedback valid>
          Congratulations! Your password is on point
        </FormFeedback>
      );
    }
  };

  const doubleCheck = () => {
    if (!newPassword.length) {
      return null;
    }
    if (newPassword !== confirmPassword) {
      return { invalid: true };
    }
    if (newPassword === confirmPassword) {
      return { valid: true };
    }
  };

  const confirmPasswordFeedback = () => {
    if (!newPassword.length) {
      return null;
    }
    if (newPassword !== confirmPassword) {
      return <FormFeedback invalid>Password does not match</FormFeedback>;
    }
    if (newPassword === confirmPassword) {
      return <FormFeedback valid>Password matched!</FormFeedback>;
    }
  };
  return (
    <Form
      style={{
        marginTop: "20px",
        marginRight: "10px",
        marginLeft: "10px",
        marginBottom: "20px"
      }}
      onSubmit={handleSubmit}
      type="text"
    >
      <p
        style={{
          fontStyle: "italic",
          fontSize: "15px",
          color: "grey"
        }}
      >
        Sign Up for free and always will be <span></span>🆓
      </p>

      <FormGroup>
        <br></br>
        <Label for="Name">User Name</Label>
        <Input
          type="Name"
          name="Name"
          id="Name"
          placeholder="amandalee123"
          value={username}
          onChange={handleUsernameInput}
          {...inputName()}
        />
        {nameFeedback()}
        <FormText>Enter a username between 10 to 15 characters</FormText>
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="emailaddress@gmail.com"
          value={email}
          onChange={e => handleEmailInput(e.target.value)}
          {...getEmailValid()}
        />
        <FormText>Enter a registered Email Address</FormText>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          {...inputPassword()}
        />
        {passwordFeedback()}
        <FormText>
          Enter a password that contains at least 6 characters
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          name="password1"
          id="Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          {...doubleCheck()}
        />
        {confirmPasswordFeedback()}
        <FormText>Re-enter your Password</FormText>
      </FormGroup>
      <Button
        disabled={!enable}
        style={{
          marginLeft: "10px",
          width: "100px",
          marginTop: "40px",
          marginBottom: "40px",
          backgroundColor: "white",
          color: "black",
          border: "2px solid #008CBA"
        }}
      >
        Register
      </Button>
    </Form>
  );
};

export default SignUpPage;
