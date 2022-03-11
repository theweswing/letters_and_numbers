
import React, { useEffect, useState } from "react";
import LetterTile from "./LetterTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PlayersWord from "./PlayersWord";
import NumberTile from "./NumberTile";
import OperandTile from "./OperandTile";
import NumOptions from "./NumOptions";
import Operands from "./Operands";
import CurrentStep from "./CurrentStep";
import NumSteps from "./NumSteps";
// import LetterRules from "./LetterRules";

function NumbersGame({user, todaysGame,todaysNumbers,setTodaysNumbers,setPlaying,submittedAnswer,setSubmittedAnswer,setHasPlayed}){
    const [playerSolution,setPlayerSolution] = useState([])
    const [producedNumbers,setProducedNumbers] = useState([])
    const [steps,setSteps] = useState([])
    const [activeStep,setActiveStep]=useState([])
    const [hasReset,setHasReset] = useState(false)
    const [seconds,setSeconds] = useState(30)
    const [currentAnswer,setCurrentAnswer] = useState("")
    const [submittedNumber,setSubmittedNumber] = useState("")
    const [usedNumbers,setUsedNumbers] = useState("")

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

    function handleReset(){
        setPlayerSolution([])
        let numbers = [...todaysNumbers]
        setTodaysNumbers(numbers)
        setUsedNumbers([])
        setHasReset(true)
        setActiveStep([])
        setProducedNumbers([])
        setSteps([])
        setCurrentAnswer("")
    }

    function handleSubmit(){
        setSubmittedNumber(currentAnswer)
        console.log(submittedAnswer)
    }

    function addUsedNumbers(int1,int2){
        let used = [...usedNumbers]
        used.push(int1)
        used.push(int2)
        setUsedNumbers(used)
    }

    function interpretStep(step){
        console.log(step)
        let int1 = parseInt(step[0])
        let int2 = parseInt(step[2])
        if(step[1] == "+"){
            let target = int1 + int2
            addUsedNumbers(int1,int2)
            return[int1,"+",int2,target]

        }
        if(step[1] == "-"){
            let target = int1 - int2
            if(target > 0){
                addUsedNumbers(int1,int2)
                return [int1,"-",int2,target]
            }
            else{
                return false
            }
        }
        if(step[1] == "*"){
            let target = int1 * int2
            addUsedNumbers(int1,int2)
            return [int1,"*",int2,target]
        }
        if(step[1] == "/"){
            let target = int1 / int2
            if(Number.isInteger(target)){
                addUsedNumbers(int1,int2)
                return[int1,"/",int2,target]
            }
            else {
                return false
            }
        }
    }

    function grabNumber(e){
        if(activeStep.length==0 || activeStep.length==2){
            setActiveStep([...activeStep,e.target.value])
        }
        if(activeStep.length==2){
            let finishedStep = [...activeStep,e.target.value]
            console.log(interpretStep(finishedStep))
            let tempSteps = [...steps]
            let interpStep = interpretStep(finishedStep)
            if(interpStep){
            tempSteps.push(interpStep)
            setProducedNumbers([...producedNumbers,interpStep[3]])
            setSteps(tempSteps)
            console.log(steps)
            setActiveStep([])
            findHighestNumber(interpStep[3])
            }
            if(!interpStep){
                setActiveStep([])
            }
    }
        console.log(activeStep)
    }

    function findHighestNumber(newNum){
        let target = todaysGame.number_set.target
        let nums = [...todaysNumbers,producedNumbers]
        nums.push(newNum)
        let allNums = nums.flat()
        console.log(allNums)
        let closest = 0
        allNums.forEach((number) => {
            if(target - closest > target - number){
                closest=number
            }
        })
        setCurrentAnswer(closest)
    }

    function grabOperand(e){
        if(activeStep.length==1){
            setActiveStep([...activeStep,e.target.value])
        }
        console.log(activeStep)
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
            <Typography variant="h6">
                Target Number:
            </Typography>
            <Typography variant="h6">
                {todaysGame.number_set.target}
            </Typography>
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
            <NumSteps usedNumbers={usedNumbers} setUsedNumbers={setUsedNumbers} producedNumbers={producedNumbers} setProducedNumbers={setProducedNumbers} steps={steps} setSteps={setSteps} /> 
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
            <CurrentStep activeStep={activeStep}/>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
            <Operands activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabOperand={grabOperand}/>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
            <NumOptions setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} todaysNumbers={todaysNumbers} setTodaysNumbers={setTodaysNumbers} producedNumbers={producedNumbers} />
            </Grid>
            </Grid>
          }
          {submittedNumber && 
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center">
              <Typography variant="subtitle1">
                 Submission: {submittedNumber}
             </Typography>
             </Grid> 
          }
          <Grid item xs={12} sx={{ mt: 3, mb: 2 }} align="center"> 
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit ({currentAnswer})
                </Button>
            </Grid>
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