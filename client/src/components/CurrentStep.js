import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberTile from "./NumberTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";

function CurrentStep({activeStep}){

    function displayStep(){
        if(activeStep.length==3){
        const displaySteps = activeStep.map((item,index) => {
            if(index == 0 || index == 2){
                return (
                <Button key={`${item} ${index}`} color="info" variant="contained" disabled={true} size="large">
                {item}
                </Button>)
            }
            if(index==1){
                return (
                    <Button key={`${item} ${index}`} color="info" variant="contained" disabled={true} size="large">
                    {item}
                    </Button>
                )
            }
        })
        return displaySteps
    }
        else {

        }
    }

    function temporaryStep(){
        let tempStep = ["","",""]
        if(activeStep[0]){
            tempStep[0]=activeStep[0]
        }
        if(activeStep[1]){
            tempStep[1]=activeStep[1]
        }
        if(activeStep[2]){
            tempStep[2]=activeStep[2]
        }
        const displaySteps = tempStep.map((item,index) => {
            let num = item.split(",")[0]
            if(index == 0 || index == 2){
                return (
                <Button key={`${item} ${index}`} color="info" variant="contained" disabled={true} size="large">
                {num}
                </Button>)
            }
            if(index==1){
                return (
                    <Button key={`${item} ${index}`} color="info" variant="contained" disabled={true} size="large">
                    {num}
                    </Button>
                )
            }
        })
        return displaySteps
    }

    return (
        <Stack direction = "row" spacing={2} justifyContent="center">
        {temporaryStep()}
        {/* <Button color="info" variant="contained" disabled="true" size="large">
            1
        </Button>
        <Button color="info" variant="contained" disabled="true" size="small">
            +
        </Button>
        <Button color="info" variant="contained" disabled="true" size="large">
            2
        </Button> */}
</Stack>
    )
}

export default CurrentStep