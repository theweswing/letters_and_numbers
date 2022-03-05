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
import { Divider } from "@mui/material";
import { Stack } from "@mui/material";

function LetterStats({hasPlayed, todaysSolutions}){
const [toggle9,setToggle9] = useState(false)
const [toggle8,setToggle8] = useState(false)
const [toggle7,setToggle7] = useState(false)
const [toggle6,setToggle6] = useState(false)
const [toggle5,setToggle5] = useState(false)
const [toggle4,setToggle4] = useState(false)
const [toggle3,setToggle3] = useState(false)
const [toggle2,setToggle2] = useState(false)

function toggle9s(){
    toggleAll()
    setToggle9(!toggle9)
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
    setToggle9(false)
    setToggle8(false)
    setToggle7(false)
    setToggle6(false)
    setToggle5(false)
    setToggle4(false)
    setToggle3(false)
    setToggle2(false)
}

function mapNines(solutions){
    const nine_lws = solutions.l9.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            ⭐ {givenWord.toUpperCase()} ({givenWord.length}) ⭐
            </Typography>
        )
    })
    return nine_lws
}

function mapEights(solutions){
    const eight_lws = solutions.l8.map((givenWord) => {
        return (
            <Grid item component={Typography} variant = "subtitle2" xs={6}>
            {givenWord.toUpperCase()} 
            </Grid>
            // <Typography variant = "subtitle2" xs={3}>
            // {givenWord.toUpperCase()}    
            // </Typography>
        )
    })
    return eight_lws
}


function mapSevens(solutions){
    const seven_lws = solutions.l7.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return seven_lws
}

function mapSixes(solutions){
    const six_lws = solutions.l6.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return six_lws
}

function mapFives(solutions){
    const five_lws = solutions.l5.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return five_lws
}

function mapFours(solutions){
    const four_lws = solutions.l4.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return four_lws
}

function mapThrees(solutions){
    const three_lws = solutions.l3.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return three_lws
}

function mapTwos(solutions){
    const two_lws = solutions.l2.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return two_lws
}

function mapEights(solutions){
    const eight_lws = solutions.l8.map((givenWord) => {
        return (
            <Typography variant = "subtitle2">
            {givenWord.toUpperCase()}    
            </Typography>
        )
    })
    return eight_lws
}
if(hasPlayed){
    return (
        <Grid item xs={12} sx={{ mt: -2 }} align="center">
            <Typography variant="h4">
            {hasPlayed[0].letter_game.date}
            </Typography>
            <Divider orientation="horizontal" />
            <Typography variant="h5" sx={{mt: 2, mb: 2}}>
            Your word:
            </Typography>
        <Typography variant="h3">
            {hasPlayed[0].answer} ({hasPlayed[0].score})
        </Typography>
        <Divider orientation="horizontal" />
        <Typography variant="h4" sx={{mt: 2, mb: 2}}>
            Other possible solutions:
            </Typography>
            {mapNines(todaysSolutions)}
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            wrap="nowrap"
            >
            {toggle8 ? <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle8s} size="medium">8</Grid>
            : <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle8s} size="medium">8</Grid>
            }
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle7s} size="medium">7</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle6s} size="medium">6</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle5s} size="medium">5</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle4s} size="medium">4</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle3s} size="medium">3</Grid>
            <Grid item zeroMinWidth component={Button} xs={1} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" onClick={toggle2s} size="medium">2</Grid>
            </Grid>
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle8s}>Eights</Button> */}
            {toggle8 &&
            mapEights(todaysSolutions)
            }  
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle7s}>Sevens</Button> */}
            {toggle7 &&
            mapSevens(todaysSolutions)
            }
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle6s}>Sixes</Button> */}
            {toggle6 &&
            mapSixes(todaysSolutions)
            }
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle5s}>Fives</Button> */}
            {toggle5 &&
            mapFives(todaysSolutions)
            }
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle4s}>Fours</Button> */}
            {toggle4 &&
            mapFours(todaysSolutions)
            }
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle3s}>Threes</Button> */}
            {toggle3 &&
            mapThrees(todaysSolutions)
            }
            {/* <Button sx={{mt:1, mb:1}} fullWidth variant="contained" onClick={toggle2s}>Twos</Button> */}
            {toggle2 &&
            mapTwos(todaysSolutions)
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