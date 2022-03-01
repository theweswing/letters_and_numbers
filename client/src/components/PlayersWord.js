import React, { useEffect, useState } from "react";
import LetterTile from "./LetterTile";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

function PlayersWord({usedLetters}){
    const [userWord,setUserWord] = useState(usedLetters)

    useEffect(() => {
        setUserWord(usedLetters)
    })

    function displayPlayerWord(lettersInUse){
        let counter = 0
        let usedLetterTiles = lettersInUse.map((givenLetter) => {
            counter +=1
            return (
                <Grid item xs={1} key={`${counter} ${givenLetter}`}>
                <Button
                    sx={{
                    variant: "contained",
                    color: "black",
                    backgroundColor: "#grey",
                    fontSize:"large",
                    '&:hover': {
                        borderColor: "yellow",
                        boxShadow: 'none',
                        backgroundColor: "#2FBD01"
                    }
                    }}
                >
                    {givenLetter}
                </Button>
                </Grid>
            )
        })
        while (counter <= 8){
            usedLetterTiles.push(
                <Grid item xs={1} alignItems="center" justifyContent="center" key={counter}>
                <Button
                sx={{
                variant: "contained",
                color: "black",
                backgroundColor: "#grey",
                fontSize:"large",
                '&:hover': {
                    borderColor: "yellow",
                    boxShadow: 'none',
                    backgroundColor: "#2FBD01"
                }
                }}
            >
                _
            </Button>
            </Grid>)
            counter +=1
        }
        return usedLetterTiles
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
        {/* <Stack 
            justifyContent="center" 
            direction="row" spacing={2}  
            divider={<Divider orientation="vertical" flexItem />}
            > */}
            {displayPlayerWord(userWord)}
        {/* </Stack> */}
        </Grid>

    )
}

export default PlayersWord