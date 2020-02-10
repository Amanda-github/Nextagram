import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const LogInPage = ({ LogInUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const enable = username.length > 0 && password.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username);
    setUserName("");
    console.log(password);
    setPassword("");
    LogInUser(username, password);
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
      <FormGroup>
        <Label for="Username">User Name</Label>
        <Input
          type="Name"
          name="Name"
          id="Name"
          placeholder="Amandalee123"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input
          type="password"
          name="password"
          id="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
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
        Log In
      </Button>
    </Form>
  );
};

export default LogInPage;
