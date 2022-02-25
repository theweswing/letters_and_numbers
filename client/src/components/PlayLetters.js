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
import { Button } from "@mui/material";
import PlayersWord from "./PlayersWord";

function PlayLetters(){
    const [todaysGame,setTodaysGame] = useState(false)
    const [todaysLetters,setTodaysLetters] = useState(false)
    const [todaysSolutions,setTodaysSolutions] = useState(false)
    const [playerSolution,setPlayerSolution] = useState([])
    const [hasReset,setHasReset] = useState(false)

    function grabLetter(e){
        console.log(e.target.value)
        setHasReset(false)
        if(e.target.value !== "0"){
            setPlayerSolution([...playerSolution,e.target.value])
        }
        console.log(playerSolution)
    }

    function handleReset(){
        setPlayerSolution([])
        let letters = [...todaysLetters]
        setTodaysLetters(letters)
        setHasReset(true)
    }

    useEffect(() => {
        fetch(`/letter_games`)
          .then((res) => res.json())
          .then((gameData) => {
            let dailyGame = findTodaysGame(gameData)
            setTodaysGame(dailyGame[0])
            setTodaysLetters(dailyGame[0].letter_set.letters.split(""))
          });
      }, []);
    
    function findTodaysGame(allGames){
        let today = new Date().toISOString().slice(0, 10)
        const todaysGame = allGames.filter((game) => {
            return game.date == today
        })
        return todaysGame
    }
    
    function spawnLetterTiles(letters){
        if(letters){
            const letterTiles = letters.map((givenLetter) => {
                if (hasReset == false){
                return (<LetterTile letter={givenLetter.toUpperCase()} grabLetter={grabLetter} reset={false}/>)
                }
                else if (hasReset == true){
                    return (<LetterTile letter={givenLetter.toUpperCase()} grabLetter={grabLetter} reset={true}/>)
                }
            })
            return letterTiles
        }
        else{
            const loading = "LOADING..".split("")
            const letterTiles = loading.map((givenLetter) => {
                return (<LetterTile letter={givenLetter} grabLetter={grabLetter}/> )
            })
            return letterTiles
        }
    }

    return (
        <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center" }}
      >
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <PlayersWord usedLetters={playerSolution}></PlayersWord>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
                <Typography variant="subtitle1">
                    {playerSolution} ({playerSolution.length} letters)
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                {spawnLetterTiles(todaysLetters)}
            </Grid>
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <Button variant="contained" color="error" onClick={handleReset}>
                    Reset
                </Button>
            </Grid>
        </Box>
    )
}

export default PlayLetters