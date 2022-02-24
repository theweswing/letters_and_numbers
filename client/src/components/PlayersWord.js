import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PlayNow from "./PlayNow";
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import LetterTile from "./LetterTile";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";

function PlayersWord({usedLetters}){
    const [userWord,setUserWord] = useState(usedLetters)

    function displayPlayerWord(lettersInUse){
        let counter = 0
        let usedLetterTiles = lettersInUse.map((givenLetter) => {
            counter +=1
            return (
                <Button
                    sx={{
                    variant: "contained",
                    color: "black",
                    backgroundColor: "#grey",
                    fontSize:"large",
                    '&:hover': {
                        borderWidth: "1px",
                        borderColor: "yellow",
                        boxShadow: 'none',
                        backgroundColor: "#2FBD01"
                    }
                    }}
                >
                    {givenLetter}
                </Button>
            )
        })
        while (counter <= 8){
            usedLetterTiles.push(
                <Button
                sx={{
                variant: "contained",
                color: "black",
                backgroundColor: "#grey",
                fontSize:"large",
                '&:hover': {
                    borderWidth: "1px",
                    borderColor: "yellow",
                    boxShadow: 'none',
                    backgroundColor: "#2FBD01"
                }
                }}
            >
                _
            </Button>)
            counter +=1
        }
        return usedLetterTiles
    }

    return (
        <Grid container spacing ={.2} direction="row" justifyContent="center" alignItems="center">
        {/* <Stack 
            justifyContent="center" 
            direction="row" spacing={2}  
            divider={<Divider orientation="vertical" flexItem />}
            > */}
            {displayPlayerWord(usedLetters)}
        {/* </Stack> */}
        </Grid>

    )
}

export default PlayersWord