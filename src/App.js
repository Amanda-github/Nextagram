import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import SearchBar from "./Pages/NavBar";
import MyProfilePage from "./Pages/myProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.title = "Nextagram";
  });

  useEffect(() => {
    axios.get("https://insta.nextacademy.com/api/v1/users").then(result => {
      console.log(result);
      setUser(result.data);
    });
  }, []);

  const history = useHistory();
  console.log(history);

  const LogInUser = (username, password) => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: `${username}`,
        password: `${password}`
      }
    })
      .then(response => {
        if (response.status === 201) {
          toast.success(`Hello ${response.data.user.username} ❤️`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          localStorage.setItem("auth_token", response.data.auth_token);
          console.log(response.data.user);
          localStorage.setItem("details", JSON.stringify(response.data.user));
          const loggedInUser = JSON.parse(localStorage.getItem("details"));
          console.log(loggedInUser);
          setCurrentUser(loggedInUser);
          console.log(loggedInUser.username);
          history.push("/profile");
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          toast.warn("Invalid credentials, please try again 😔", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          console.error(error.response);
        }
      });
  };
  console.log(currentUser);

  //Log Out user
  const LogOutUser = () => {
    toast.warn("Bye Bye 🥺", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    localStorage.removeItem("auth_token");
    localStorage.removeItem("Details");
    setCurrentUser(null);
  };

  return (
    <div>
      <div className="App">
        <SearchBar
          LogInUser={LogInUser}
          LogOutUser={LogOutUser}
          currentUser={currentUser}
        />
        <ToastContainer />
        <Route exact path="/profile" component={MyProfilePage} />
        <Route exact path="/">
          <HomePage user={user} />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage user={user} />
        </Route>
      </div>
    </div>
  );
}

export default App;
