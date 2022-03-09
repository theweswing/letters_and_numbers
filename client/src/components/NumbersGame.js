
import React, { useEffect, useState } from "react";
import LetterTile from "./LetterTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PlayersWord from "./PlayersWord";
import NumberTile from "./NumberTile";
// import LetterRules from "./LetterRules";

function NumbersGame({user, todaysGame,todaysNumbers,setTodaysNumbers,setPlaying,submittedAnswer,setSubmittedAnswer,setHasPlayed}){
    const [playerSolution,setPlayerSolution] = useState([])
    const [hasReset,setHasReset] = useState(false)
    const [seconds,setSeconds] = useState(30)

      useEffect(() => {
        let totalSeconds = 30
        let timeInterval = setInterval(setTime, 1000);
        function setTime() {
            if(totalSeconds > 0 && totalSeconds <= 30) {
            --totalSeconds;
            setSeconds(totalSeconds);
            }
            if (totalSeconds == 0) {
                totalSeconds =  10000
                setSeconds(10000)
            }
        }
        return () => {
            clearInterval(timeInterval)
        }
    
}, [])

    if(seconds==10000){
        // console.log("hi")
        // console.log(submittedAnswer)
        // handleSubmit()
    }

    function handleSubmittedAnswer(){
        if(playerSolution.length > 0){
        setSubmittedAnswer(playerSolution.join(""))
        console.log(submittedAnswer)
        handleReset()
        }
    }

    function handleReset(){
        setPlayerSolution([])
        let numbers = [...todaysNumbers]
        setTodaysNumbers(numbers)
        setHasReset(true)
    }

    function spawnNumberTiles(){
        const numTileMap = todaysNumbers.map((givenNumber) => {
            if (hasReset === false){
            return (<NumberTile  number={givenNumber} reset={false}/>)
            }
            else if (hasReset === true){
                return (<NumberTile number={givenNumber} reset={true}/>)
            }
        })
        return numTileMap
    }


    return (
        <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center" }}
        >
          {seconds == false ?
           <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
           <Typography variant="subtitle1">
               Out of Time!
           </Typography>
            </Grid> :
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
            <Typography variant="subtitle1">
                {seconds}
            </Typography>
            {spawnNumberTiles()}
            </Grid> 
          }
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <Button variant="contained" color="error" onClick={handleReset}>
                    Reset
                </Button>
            </Grid>
          {/* <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <PlayersWord usedLetters={playerSolution}></PlayersWord>
            </Grid>
            {playerSolution.length > 0 &&
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
                <Typography variant="subtitle1">
                    {playerSolution} ({playerSolution.length})
                </Typography>
            </Grid>
            }
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                {spawnLetterTiles(todaysLetters)}
            </Grid>
            {submittedAnswer && 
             <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
             <Typography variant="subtitle1">
                 Submission: {submittedAnswer} ({submittedAnswer.length})
             </Typography>
            </Grid> 
            }
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <Button onClick={handleSubmittedAnswer} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <Button variant="contained" color="error" onClick={handleReset}>
                    Reset
                </Button>
            </Grid>
            <LetterRules /> */}
        </Box>
    )
}

export default NumbersGame