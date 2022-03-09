import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import LetterScoreChart from "./LetterScoreChart";
import LetterAnalytics from "./LetterAnalytics";

function LetterStats({hasPlayed, todaysSolutions,letters}){
const [toggle8,setToggle8] = useState(false)
const [toggle7,setToggle7] = useState(false)
const [toggle6,setToggle6] = useState(false)
const [toggle5,setToggle5] = useState(false)
const [toggle4,setToggle4] = useState(false)
const [toggle3,setToggle3] = useState(false)
const [toggle2,setToggle2] = useState(false)
const [analytics,setAnalytics] = useState(false)

useEffect(() => {
    fetch(`/letter_games/${hasPlayed[0].letter_game.id}/letter_results`)
      .then((res) => res.json())
      .then((resultData) => {
        console.log(resultData)
        console.log(hasPlayed[0])
        let stats = produceAnalytics(resultData,hasPlayed[0])
        setAnalytics(stats)
      });
  }, []);

function tallyResults(results){
    let totals = {
        overallAnswers: 0,
        blankInvalid: 0
    }
    results.forEach((givenResult) => {
        totals.overallAnswers +=1
        if (totals[givenResult.answer]){
            totals[givenResult.answer] +=1
        }
        else if (givenResult.answer == ""){
            totals.blankInvalid += 1
        }
        else {
            totals[givenResult.answer] = 1
        }
    })
    return totals
}

function produceAnalytics(results,userGameData){
    const talliedData = tallyResults(results)
    const totalAnswers = talliedData.overallAnswers
    const userWord = userGameData.answer
    const userScore = userGameData.score
    let analytics = {
                    total: totalAnswers,
                    userAnswer: userGameData.answer,
                    userScore: userGameData.score,
                    userAnswerPop: 0,
                    userAnswerPercent: 0,
                    mostPopAnswer: "",
                    mostPopAnswerNum: 0,
                    two: 0,
                    three: 0,
                    four: 0,
                    five: 0,
                    six: 0,
                    seven: 0,
                    eight: 0,
                    nine: 0,
                    talliedData: talliedData
                    }
    checkForUserWord(analytics,talliedData)
    for (const [key,value] of Object.entries(talliedData)) {
        trackMostPopular(analytics,key,value)
        tallyScoreSpread(analytics,key,value)
    }
    console.log(analytics)
    return analytics
}

function checkForUserWord(placeholder,tallied){
    let userWord = placeholder.userAnswer
    let total = placeholder.total
    if(tallied[userWord]){
        let percentage = (tallied[userWord]/total)*100
        placeholder.userAnswerPop = tallied[userWord]
        placeholder.userAnswerPercent = percentage
    }
}

function trackMostPopular(placeholder,key,value){
    if(value > placeholder.mostPopAnswerNum && key !== "overallAnswers"){
        placeholder.mostPopAnswer = key
        placeholder.mostPopAnswerNum = value
    }
}

function tallyScoreSpread(placeholder,key,value){
    if(key != "overallAnswers"){
        if(key.length===2){
            placeholder.two += value
        }
        if(key.length===3){
            placeholder.three +=value
        }
        if(key.length===4){
            placeholder.four +=value
        }
        if(key.length===5){
            placeholder.five +=value
        }
        if(key.length==6){
            placeholder.six +=value
        }
        if(key.length===7){
            placeholder.seven +=value
        }
        if(key.length===8){
            placeholder.eight +=value
        }
        if(key.length===9){
            placeholder.nine +=value
        }
    }
}

function toggle8s(){
    toggleAll()
    setToggle8(!toggle8)
}

function toggle7s(){
    toggleAll()
    setToggle7(!toggle7)
}

function toggle6s(){
    toggleAll()
    setToggle6(!toggle6)
}

function toggle5s(){
    toggleAll()
    setToggle5(!toggle5)
    
}

function toggle4s(){
    toggleAll()
    setToggle4(!toggle4)
}

function toggle3s(){
    toggleAll()
    setToggle3(!toggle3)
}

function toggle2s(){
    toggleAll()
    setToggle2(!toggle2)
}

function toggleAll(){
    setToggle8(false)
    setToggle7(false)
    setToggle6(false)
    setToggle5(false)
    setToggle4(false)
    setToggle3(false)
    setToggle2(false)
}

function displayUserAnswer(answer){
    if(answer.accepted == true){
        return (
        <Typography variant="subtitle1">
            {hasPlayed[0].answer.toUpperCase()} ({hasPlayed[0].score})
        </Typography>
        )
    }
    else if(answer.accepted == false && hasPlayed[0].answer===""){
        return (
                <Typography variant="h5" color="red">
                     No Word Submitted, 2 points given as courtesy.
                </Typography>
                )
            }
    else if(answer.accepted == false){
return (
        <Typography variant="h5" color="red">
            {hasPlayed[0].answer.toUpperCase()}* ({hasPlayed[0].score}) <FlagIcon />
        </Typography>
        )
    }
}

function mapNines(solutions){
    const nine_lws = solutions.l9.map((givenWord) => {
        return (
            <Typography variant = "subtitle1" key = {givenWord}>
            {givenWord.toUpperCase()}
            </Typography>
        )
    })
    return nine_lws
}

function mapEights(solutions){
    const eight_lws = solutions.l8.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return eight_lws
}


function mapSevens(solutions){
    const seven_lws = solutions.l7.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return seven_lws
}

function mapSixes(solutions){
    const six_lws = solutions.l6.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return six_lws
}

function mapFives(solutions){
    const five_lws = solutions.l5.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return five_lws
}

function mapFours(solutions){
    const four_lws = solutions.l4.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return four_lws
}

function mapThrees(solutions){
    const three_lws = solutions.l3.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return three_lws
}

function mapTwos(solutions){
    const two_lws = solutions.l2.map((givenWord) => {
        return (
            <Grid item component={Typography} xs={3} key = {givenWord} variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Grid>
        )
    })
    return two_lws
}

function displayLetters(letties){
    let new_display = []
    letties.forEach((letter) => {
        new_display.push(letter.toUpperCase())
        new_display.push(" ")
    })
    return new_display
}

if(hasPlayed && todaysSolutions){
    return (
        <Grid item xs={12} sx={{ mt: -2 }} align="center">
            <Typography variant="h6">
            {hasPlayed[0].letter_game.date}
            </Typography>
            <Typography variant="h6">
            {displayLetters(letters)}
            </Typography>
            <Divider orientation="horizontal" />
            <Typography variant="h6" sx={{mt: 1, mb: 1}}>
           Perfect Solution:
            </Typography>
            {mapNines(todaysSolutions)}
            <Typography variant="h6" sx={{mt: 1, mb: 1}}>
            Your solution:
            </Typography>
        {displayUserAnswer(hasPlayed[0])}
        
        <Typography variant="h6" sx={{mt: 1, mb: 1}}>
            How you did:
            </Typography>
        <LetterAnalytics analytics={analytics} />
        <Divider orientation="horizontal" />
            <Typography variant="h7" sx={{mt: 1, mb: 0}}>
           Other solutions:
            </Typography>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            wrap="nowrap"
            >
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle8s} size="medium">8</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle7s} size="medium">7</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle6s} size="medium">6</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle5s} size="medium">5</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle4s} size="medium">4</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle3s} size="medium">3</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle2s} size="medium">2</Grid>
            </Grid>
            {toggle8 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapEights(todaysSolutions)}
            </Grid>
            }  
            {toggle7 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapSevens(todaysSolutions)}
            </Grid>
            }
            {toggle6 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapSixes(todaysSolutions)}
            </Grid>
            }
            {toggle5 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapFives(todaysSolutions)}
            </Grid>
            }
            {toggle4 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapFours(todaysSolutions)}
            </Grid>
            }
            {toggle3 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapThrees(todaysSolutions)}
            </Grid>
            }
            {toggle2 &&
            <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="stretch"
            >
            {mapTwos(todaysSolutions)}
            </Grid>
            }
        </Grid>
    )
        }
        else {
            return (
                <Typography>
                    Loading
                </Typography>
            )
        }
}

export default LetterStats