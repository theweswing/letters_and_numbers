import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PlayNow from "./PlayNow";
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import PlayLetters from "./PlayLetters";
import LandingLetters from "./LandingLetters";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user)
          setUser(user)
        });
      }
      else {
        createUser()
      }
    });
  }, []);

  function createUser(){
    fetch(`/users`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      })
    .then((r) => r.json())
    .then((newUser) => {
        console.log(newUser)
        setUser(newUser)
    })
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: "#35D801",
        contrastText: "#FFFFFF"
      },
      secondary: {
        main: "#35D801",
          contrastText: "#FFFFFF"
      }
  }})

  return (
    <>
    <ThemeProvider theme={theme}>
    <NavBar user={user}/>
      <Switch>
        <Route exact path="/">
        <PlayNow user={user} />
        </Route>
        <Route exact path ="/letters">
        <PlayLetters user={user}/>
        </Route>
        <Route exact path ="/test">
        <LandingLetters user={user}/>
        </Route>
        <Route path="*">
        <PlayNow user={user} />
        </Route>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
