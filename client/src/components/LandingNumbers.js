import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import LettersGame from "./LettersGame";
import LetterStats from "./LetterStats";
import NumbersRules from "./NumbersRules";
import NumbersGame from "./NumbersGame";

function LandingNumbers({user}){
    const [todaysGame,setTodaysGame] = useState(false)
    const [todaysNumbers,setTodaysNumbers] = useState(false)
    const [todaysSolutions,setTodaysSolutions] = useState(false)
    const [todaysTarget,setTodaysTarget] = useState(false)
    const [submittedAnswer,setSubmittedAnswer] = useState(false)
    const [hasPlayed,setHasPlayed] = useState(false)
    const [playing,setPlaying] = useState(false)

    function handlePlaying(){
        setPlaying(true)
    }

    useEffect(() => {
        fetch(`/number_games`)
          .then((res) => res.json())
          .then((gameData) => {
            let dailyGame = findTodaysGame(gameData)
            setTodaysGame(dailyGame[0])
            // console.log(dailyGame[0])
            findTodaysSolutions(dailyGame[0])
            // console.log((organizeNumbers(dailyGame[0])))
            setTodaysNumbers(organizeNumbers(dailyGame[0]))
            setTodaysTarget(dailyGame[0].number_set.target)
            hasUserPlayed(user)
          });
      }, []);

    function findTodaysSolutions(game){
        fetch(`/number_sets/${game.number_set.id}/number_solutions`)
        .then((r) => r.json())
        .then((solutionData) => {
            // console.log(solutionData)
            setTodaysSolutions(solutionData)
        })
    }

    function hasUserPlayed(user){
        fetch(`/users/${user.id}/number_results`)
        .then((r) => r.json())
        .then((resultData) => {
            let today = new Date().toISOString().slice(0, 10)
            const todaysResult = resultData.filter((result) => {
                return result.letter_game.date === today
            })
            if (todaysResult.length > 0) {
                // console.log("variable hasPlayed:")
                // console.log(todaysResult)
                // console.log(todaysResult.length)
                setHasPlayed(todaysResult)
            }
            else {
                // console.log("No game found!")
            }
        })
    }

    function findTodaysGame(allGames){
        let today = new Date().toISOString().slice(0, 10)
        const todaysGame = allGames.filter((game) => {
            return game.date === today
        })
        return todaysGame
    }

    function organizeNumbers(gameData){
        let numbers = []
        numbers.push(gameData.number_set.number_one)
        numbers.push(gameData.number_set.number_two)
        numbers.push(gameData.number_set.number_three)
        numbers.push(gameData.number_set.number_four)
        numbers.push(gameData.number_set.number_five)
        numbers.push(gameData.number_set.number_six)
        return numbers
    }


    if(playing && !hasPlayed){
        return(
            <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center" }}
        >
        <NumbersGame setHasPlayed={setHasPlayed} user={user} todaysGame={todaysGame} todaysNumbers={todaysNumbers} setTodaysNumbers={setTodaysNumbers} todaysSolutions={todaysSolutions} setPlaying={setPlaying} submittedAnswer={submittedAnswer} setSubmittedAnswer={setSubmittedAnswer}/> 
        </Box>
        )
    }

    // if(hasPlayed && !playing){
    //     return(
    //     <Box
    //     container
    //     noValidate
    //     sx={{ mt: 3 }}
    //     style={{ justifyContent: "center" }}
    //     >
    //     <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
    //     <LetterStats  hasPlayed={hasPlayed} todaysSolutions={todaysSolutions} letters={todaysLetters}/>
    //     </Grid>
    //     </Box>
    //     )
    // }

    if(!hasPlayed && !playing){
        return(
            <Box
            container
            noValidate
            sx={{ mt: 3 }}
            style={{ justifyContent: "center" }}
            >
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        <Button onClick={handlePlaying} variant="contained">
        PLAY
        </Button>
        </Grid>
         <NumbersRules />
            </Box>  
        )
    }
}


export default LandingNumbers