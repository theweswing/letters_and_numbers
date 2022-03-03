import React, { useEffect, useState } from "react";
import LetterTile from "./LetterTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PlayersWord from "./PlayersWord";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PlayLetters from "./PlayLetters";
import LetterRules from "./LetterRules";
import LettersGame from "./LettersGame";

function LandingLetters({user}){
    const [todaysGame,setTodaysGame] = useState(false)
    const [todaysLetters,setTodaysLetters] = useState(false)
    const [todaysSolutions,setTodaysSolutions] = useState(false)
    const [playerSolution,setPlayerSolution] = useState(false)
    const [submittedAnswer,setSubmittedAnswer] = useState(false)
    const [hasPlayed,setHasPlayed] = useState(false)
    const [toggleRules,setToggleRules] = useState(false)
    const [playing,setPlaying] = useState(false)

    function handleRules(){
        setToggleRules(!toggleRules)
        }

    function handlePlaying(){
        setPlaying(true)
    }

    useEffect(() => {
        fetch(`/letter_games`)
          .then((res) => res.json())
          .then((gameData) => {
            let dailyGame = findTodaysGame(gameData)
            setTodaysGame(dailyGame[0])
            console.log(dailyGame[0])
            setTodaysLetters(dailyGame[0].letter_set.letters.split(""))
            findTodaysSolutions(dailyGame[0])
            hasUserPlayed(user)
          });
      }, []);

    function findTodaysSolutions(game){
        fetch(`/letter_sets/${game.letter_set.id}/letter_solutions`)
        .then((r) => r.json())
        .then((solutionData) => {
            console.log(solutionData)
            organizeSolutions(solutionData)
        })
    }

    function hasUserPlayed(user){
        fetch(`/users/${user.id}/letter_results`)
        .then((r) => r.json())
        .then((resultData) => {
            let today = new Date().toISOString().slice(0, 10)
            const todaysResult = resultData.filter((result) => {
                return result.letter_game.date === today
            })
            if (todaysResult.length > 0) {
                console.log(todaysResult)
                // setHasPlayed(todaysResult)
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

    function organizeSolutions(solutions){
        let solutionsByLength= {
            l9: [],
            l8: [],
            l7: [],
            l6: [],
            l5: [],
            l4: [],
            l3: [],
            l2: []
        }
        const allWords = solutions.map((givenWord) => {
            if(givenWord.length == 9){
                if (solutionsByLength.l9.includes(givenWord.word) == false){
                    solutionsByLength.l9.push(givenWord.word)
                }
            }
            if(givenWord.length == 8){
                if (solutionsByLength.l8.includes(givenWord.word) == false){
                    solutionsByLength.l8.push(givenWord.word)
                }
            }
            if(givenWord.length == 7){
                if (solutionsByLength.l7.includes(givenWord.word) == false){
                    solutionsByLength.l7.push(givenWord.word)
                }
            }
            if(givenWord.length == 6){
                if (solutionsByLength.l6.includes(givenWord.word) == false){
                    solutionsByLength.l6.push(givenWord.word)
                }
            }
            if(givenWord.length == 5){
                if (solutionsByLength.l5.includes(givenWord.word) == false){
                    solutionsByLength.l5.push(givenWord.word)
                }
            }
            if(givenWord.length == 4){
                if (solutionsByLength.l4.includes(givenWord.word) == false){
                    solutionsByLength.l4.push(givenWord.word)
                }
            }
            if(givenWord.length == 3){
                if (solutionsByLength.l3.includes(givenWord.word) == false){
                    solutionsByLength.l3.push(givenWord.word)
                }
            }
            if(givenWord.length == 2){
                if (solutionsByLength.l2.includes(givenWord.word) == false){
                    solutionsByLength.l2.push(givenWord.word)
                }
            }
        })
        console.log(solutionsByLength)
        setTodaysSolutions(solutionsByLength)
    }

    if(playing && !hasPlayed){
        return(
            <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center" }}
        >
        <LettersGame setHasPlayed={setHasPlayed} user={user} todaysGame={todaysGame} todaysLetters={todaysLetters} setTodaysLetters={setTodaysLetters} todaysSolutions={todaysSolutions} setPlaying={setPlaying} submittedAnswer={submittedAnswer} setSubmittedAnswer={setSubmittedAnswer}/> 
        </Box>
        )
    }

    if(hasPlayed && !playing){
        return(
        <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center" }}
        >
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        <Typography variant="h2">
            {hasPlayed.answer} ({hasPlayed.score})
        </Typography>
        </Grid>
        </Box>
        )
    }

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
         <LetterRules />
            </Box>  
        )
    }
}


export default LandingLetters