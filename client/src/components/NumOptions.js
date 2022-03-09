import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberTile from "./NumberTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

function NumOptions({todaysNumbers,setTodaysNumbers,producedNumbers}){

function spawnNumberTiles(){
    const mapNumberTiles = todaysNumbers.map((givenNumber) => {
        return (
            <NumberTile number={givenNumber} />
        )
    })
    return mapNumberTiles
}

function spawnProducedTiles(){
    if(producedNumbers.length > 0){
        const mapProducedTiles = producedNumbers.map((givenNumber) => {
            return (
                <NumberTile number={givenNumber} />
            )
        })
        return mapProducedTiles
}
}
    return (

        <Box
        container
        noValidate
        sx={{ mt: 1 }}
        style={{ justifyContent: "center" }}
        >
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {spawnProducedTiles()}
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {spawnNumberTiles()}
        </Grid>
        </Box>
    )
}

export default NumOptions