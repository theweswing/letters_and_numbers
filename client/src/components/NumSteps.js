import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberTile from "./NumberTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

function NumSteps({steps,setSteps}){

    function spawnSteps(){
        const stepMap = steps.map((givenStep) => {
            return (
                <p key={givenStep}>{`${givenStep[0]} ${givenStep[1]} ${givenStep[2]} = ${givenStep[3]}`}</p>
            )
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