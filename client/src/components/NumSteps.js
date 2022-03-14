import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberTile from "./NumberTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from "@mui/material";

function NumSteps({todaysGame,todaysNumbers,steps,setSteps,producedNumbers,setProducedNumbers,usedNumbers,setUsedNumbers,setCurrentAnswer}){

    function removeStep(){
        let trackSteps = [...steps]
        let lastStep = trackSteps.pop()
        setSteps(trackSteps)
    }

    function removeProducedNumber(){
        let trackProduced = [...producedNumbers]
        let lastNumber = trackProduced.pop()
        setProducedNumbers(trackProduced)
        let target = todaysGame.number_set.target
        let nums = [...todaysNumbers,trackProduced]
        let allNums = nums.flat()
        console.log(allNums)
        let closest = 0
        allNums.forEach((number) => {
            if(findDifference(target,number) < findDifference(closest,target)){
                closest=number
            }
        })
        setCurrentAnswer(closest)
    }

    function findDifference(int1,int2){
        if(int1 > int2){
            return int1 - int2
        }
        if(int2 > int1){
            return int2 - int1
        }
        if(int1 == int2){
            return 0
        }
    }

    function handleBackButton(){
        restoreUsedNumbers()
        removeStep()
        removeProducedNumber()
    }

    function restoreUsedNumbers(){
        let used = [...usedNumbers]
        console.log("used numbers:")
        console.log(used)
        console.log("steps:")
        console.log(steps)
        let reversed = used.reverse()
        let lastStep = steps[steps.length-1]
        console.log("last step:")
        console.log(lastStep)
        lastStep.forEach((step) => {
            console.log(step)
            let index = findUsedNumber(step,reversed)
            if (index !== -1){
                let pulled = reversed.splice(index,1)
            }
        })
        console.log(reversed)
        setUsedNumbers(reversed.reverse())
    }

    function findUsedNumber(num,arr){
        let numsOnly = arr.map((entry) => {
            let split = entry.split(",")
            return split[0]
        })
        console.log(numsOnly)
        return numsOnly.indexOf(String(num))
    }

    function spawnSteps(){
        let counter = 0
        const stepMap = steps.map((givenStep) => {
            console.log(givenStep)
            counter +=1
            if(counter==steps.length){
                return (
                <Grid key={givenStep} item xs={12} sx={{ mb: 1 }} align="center"> 
                <Typography key={givenStep}>
                    {`${givenStep[0]} ${givenStep[1]} ${givenStep[2]} = ${givenStep[3]}`}
                    <IconButton onClick={handleBackButton}><ReplyIcon></ReplyIcon></IconButton>
                    </Typography>
                </Grid>
                )
            }
            else{
            return (
                <p key={givenStep}>{`${givenStep[0]} ${givenStep[1]} ${givenStep[2]} = ${givenStep[3]}`}</p>
            )
            }
        })
        return stepMap
    }
    return (
        <Box
        container
        noValidate
        sx={{ mt: 1 }}
        style={{ justifyContent: "center" }}
        >
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {spawnSteps()}
        </Grid>
        </Box>
    )
}

export default NumSteps