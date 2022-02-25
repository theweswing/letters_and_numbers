import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PlayNow from "./PlayNow";
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import LetterTile from "./LetterTile";
import { Stack } from "@mui/material";
import PlayLetters from "./PlayLetters";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

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
        <Route path="*">
        <PlayNow user={user} />
        </Route>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
