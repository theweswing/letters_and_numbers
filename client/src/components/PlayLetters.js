import React, { useEffect, useState } from "react";
import LetterTile from "./LetterTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PlayersWord from "./PlayersWord";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function PlayLetters({user}){
    const [todaysGame,setTodaysGame] = useState(false)
    const [todaysLetters,setTodaysLetters] = useState(false)
    const [todaysSolutions,setTodaysSolutions] = useState(false)
    const [playerSolution,setPlayerSolution] = useState([])
    const [hasReset,setHasReset] = useState(false)
    const [seconds,setSeconds] = useState(30)
    const [submittedAnswer,setSubmittedAnswer] = useState("")
    const [toggleRules,setToggleRules] = useState(false)

    useEffect(() => {
        fetch(`/letter_games`)
          .then((res) => res.json())
          .then((gameData) => {
            let dailyGame = findTodaysGame(gameData)
            setTodaysGame(dailyGame[0])
            console.log(dailyGame[0])
            setTodaysLetters(dailyGame[0].letter_set.letters.split(""))
          });
      }, []);

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
        setSeconds(false)
    }

    function handleRules(){
    setToggleRules(!toggleRules)
    }

    function handleSubmittedAnswer(){
        if(playerSolution.length > 0){
        setSubmittedAnswer(playerSolution.join(""))
        console.log(submittedAnswer)
        handleReset()
        }
    }
    
    function findTodaysGame(allGames){
        let today = new Date().toISOString().slice(0, 10)
        const todaysGame = allGames.filter((game) => {
            return game.date === today
        })
        return todaysGame
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
              res.json().then((data) => console.log(data));
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
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
                <Typography variant="h5">
                    Rules {toggleRules ? 
            <ArrowDropDownIcon onClick={handleRules}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleRules}></ArrowRightIcon>}
                </Typography>
                {toggleRules && 
                <>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • In 30 seconds, spell the longest word you can.
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • Use the buttons to spell out your word and <b>SUBMIT</b>
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • <b>Your score</b> = the length of the word you submitted.
                </Typography>
                <Typography variant="subtitle2" sx={{mb:.5, mt: 2}}>
                • You are not locked in to your first SUBMIT
                </Typography>
                <Typography variant="subtitle2" sx={{mb:.5}}>
                • When 30 seconds runs out, you will be scored on your most recent SUBMIT
                </Typography>
                <Typography variant="subtitle2" sx={{mb:.5}}>
                • If you do not submit a word, or your word does not exist, you will be scored 2 points.
                </Typography>
                <Typography variant="subtitle2">
                • Each set contains a "perfect" word that uses all 9 letters.
                </Typography>
                </>
                }
            </Grid>
        </Box>
    )
}

export default PlayLetters