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
        r.json().then((userFound) => {
          setUser(userFound)
          console.log(userFound)
          if(!userFound.id){
            createUser(userFound)
          }
        });
      }
    });
  }, []);


  function createUser(userData){
    if(!userData){
    fetch(`/users`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      })
    .then((r) => r.json())
    .then((newUser) => {
        console.log("user not found, new user created")
        console.log(newUser)
        setUser(newUser)
    })
  }
  else{
    console.log("valid user fed to createUser function")
    console.log(userData)
    setUser(userData)
    console.log(user)
  }
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
  },
    typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },})

  
if(user){
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
if(!user){
  return (
    <ThemeProvider theme={theme}>
    <NavBar user={user}/>
    </ThemeProvider>
  )
}
}

export default App;
