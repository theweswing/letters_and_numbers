import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PlayNow from "./PlayNow";
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import LetterTile from "./LetterTile";
import { Stack } from "@mui/material";

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
      <main>
        <PlayNow user={user} />
          <Stack justifyContent="center" 
            direction="row" spacing={2}>
            <LetterTile letter={"L"} />
            <LetterTile letter={"E"} />
            <LetterTile letter={"T"} />
            <LetterTile letter={"T"} />
            <LetterTile letter={"E"} />
            <LetterTile letter={"R"} />
            <LetterTile letter={"S"} />
              </Stack>
      </main>
      </ThemeProvider>
    </>
  );
}

export default App;
