import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberTile from "./NumberTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from "@mui/material";

function NumSteps({steps,setSteps,producedNumbers,setProducedNumbers,usedNumbers,setUsedNumbers}){

    function removeStep(){
        let trackSteps = [...steps]
        let lastStep = trackSteps.pop()
        setSteps(trackSteps)
    }

    function removeProducedNumber(){
        let trackProduced = [...producedNumbers]
        let lastNumber = trackProduced.pop()
        setProducedNumbers(trackProduced)
    }

    function handleBackButton(){
        restoreUsedNumbers()
        removeStep()
        removeProducedNumber()
    }

    function restoreUsedNumbers(){
        let used = [...usedNumbers]
        console.log(steps)
        let reversed = used.reverse()
        let lastStep = steps[steps.length-1]
        console.log(lastStep)
        lastStep.forEach((step) => {
            let index = reversed.indexOf(step)
            if (index!== -1){
                reversed.splice(index,1)
            }
        })
        setUsedNumbers(reversed.reverse())
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