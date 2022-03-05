
import React, { useEffect, useState } from "react";
import LetterTile from "./LetterTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PlayersWord from "./PlayersWord";
import LetterRules from "./LetterRules";

function LettersGame({user, todaysGame,todaysLetters,setTodaysLetters,todaysSolutions,setPlaying,submittedAnswer,setSubmittedAnswer,setHasPlayed}){
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
        console.log("hi")
        console.log(submittedAnswer)
        handleSubmit()
    }

    function handleSubmittedAnswer(){
        if(playerSolution.length > 0){
        setSubmittedAnswer(playerSolution.join(""))
        console.log(submittedAnswer)
        handleReset()
        }
    }

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

    function handleSubmit(){
        fetch(`/letter_sets/${todaysGame.letter_set.id}/letter_solutions`)
                .then((r) => {
                  if (r.ok) {
                    r.json()
                    .then((data) => {
                        console.log("perfect solution:")
                        console.log(data[0].word)
                        console.log("player solution:")
                        console.log(submittedAnswer)
                        if(wordListIncludes(submittedAnswer,data) === false){
                            checkAgainstDictionaryAPI(submittedAnswer,user)
                        }
                        else{
                            saveAnswer(submittedAnswer,user)
                        }
                    })
                    }})
    }

    function wordListIncludes(answer,wordList){
        let words = []
        let wordMap = wordList.map((givenWord) => {
            words.push(givenWord.word.toUpperCase())
        })
        let uniqueWords = [...new Set(words)]
        let listedWords = Array.from(uniqueWords)
        if (listedWords.includes(answer)){
            console.log(`${answer} found in Solutions DB. Next step: Saving answer.`)
            return true
        }
        else {
            console.log(`${answer} not found in Solutions DB. Next step: Checking external dictionary.`)
            return false
        }
    }

    function checkAgainstDictionaryAPI(answer,user){
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`)
                .then((r) => {
                  if (r.ok) {
                    r.json()
                    .then((data) => {
                        console.log(data)
                        let entry = {
                            word: data[0].word,
                            length: data[0].word.length
                        }
                        fetch(`letter_sets/${todaysGame.letter_set.id}/letter_solutions`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify(entry),
                        })
                        .then((res) => {
                            if (res.ok) {
                                res.json()
                                    .then((newWordInDB) => {
                                        console.log(newWordInDB)
                                        saveAnswer(answer,user)
                                    });
                            } 
                            else {
                                res.json()
                                .then((errors) => {
                                    console.log(errors)
                                    return false
                                });
                            }
                        })
                    })
                }
            else{
                console.log(`${answer}: Word not found in internal or external dictionaries`)
                console.log("Player will be scored a friendly 2 points.")
                saveBadAnswerUser(answer,user)
            }})
                
    }

    function saveAnswer(answer,user){
        let entry = {
            user_id: user.id,
            letter_game_id: todaysGame.id,
            answer: answer,
            score: answer.length
        }
        fetch("/letter_results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
          }).then((res) => {
            if (res.ok) {
              res.json().then((data) => {
                console.log(data)
                setPlaying(false)
                setHasPlayed(data[0])
            });
            } else {
              res.json().then((errors) => console.log(errors));
            }
          });
    }

    function saveBadAnswerUser(answer,user){
        let entry = {
            user_id: user.id,
            letter_game_id: todaysGame.id,
            answer: answer,
            score: 2
        }
        fetch("/letter_results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
          }).then((res) => {
            if (res.ok) {
              res.json().then((data) => console.log(data));
            } else {
              res.json().then((errors) => console.log(errors));
            }
          });
    }

    function spawnLetterTiles(letters){
        if(letters){
            let counter = 1
            const letterTiles = letters.map((givenLetter) => {
                if (hasReset === false){
                    counter +=1
                return (<LetterTile key={counter} letter={givenLetter.toUpperCase()} grabLetter={grabLetter} reset={false}/>)
                }
                else if (hasReset === true){
                    counter +=1
                    return (<LetterTile key={counter} letter={givenLetter.toUpperCase()} grabLetter={grabLetter} reset={true}/>)
                }
            })
            return letterTiles
        }
        else{
            let counter = 1
            const loading = "LOADING..".split("")
            const letterTiles = loading.map((givenLetter) => {
                counter +=1
                return (<LetterTile key={counter} letter={givenLetter} grabLetter={grabLetter}/> )
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
            </Grid> 
          }
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
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
            <LetterRules />
        </Box>
    )
}

export default LettersGame