import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberTile from "./NumberTile";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

function NumOptions({setUsedNumbers, usedNumbers,grabNumber,todaysNumbers,setTodaysNumbers,producedNumbers,hasReset,setHasReset,activeStep}){
// console.log("num option rendering")
function spawnNumberTiles(){
    const mapNumberTiles = todaysNumbers.map((givenNumber,index) => {
        return (
            <NumberTile usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} value={givenNumber} number={givenNumber} />
        )
    })
    return mapNumberTiles
}

function spawnProducedTiles(){
    if(producedNumbers.length > 0){
        const mapProducedTiles = producedNumbers.map((givenNumber,index) => {
            return (
                <NumberTile usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} value={givenNumber} number={givenNumber} />
            )
        })
        return mapProducedTiles
}
}

// todaysNumbers vs usedNumbers
// while iterating through todaysNumbers, if givenNumber is in usedNumbers, grey it*
// *If a number only occurs once on UsedNumbers, it should not grey out a second button w/ same value

function spawnAllTiles(){
    let tracker = {}
    const mapNumberTiles = todaysNumbers.map((givenNumber,index) => {
        let entry = `${givenNumber},${index}`
        if(tracker[givenNumber]){
            tracker[givenNumber] +=1
            if(tracker[givenNumber] > howManyTimesUsed(givenNumber)){
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={false}/>
                )
            }
            else {
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={true}/>
                )
            }
        }
        else {
            tracker[givenNumber]=1
            if(tracker[givenNumber] > howManyTimesUsed(givenNumber)){
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={false}/>
                )
            }
            else {
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={true}/>
                )
            }
        }
    })
    const mapProducedTiles = producedNumbers.map((givenNumber,index) => {
        let entry = `${givenNumber},${index}`
        if(tracker[givenNumber]){
            tracker[givenNumber] +=1
            if(tracker[givenNumber] > howManyTimesUsed(givenNumber)){
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={false}/>
                )
            }
            else {
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={true}/>
                )
            }
        }
        else {
            tracker[givenNumber]=1
            if(tracker[givenNumber] > howManyTimesUsed(givenNumber)){
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={false}/>
                )
            }
            else {
                return (
                    <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={true}/>
                )
            }
        }
    })
    return (
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {mapProducedTiles}
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {mapNumberTiles}
        </Grid>
        </Grid>
    )
}

function newSpawner(){
    const mapNumberTiles = todaysNumbers.map((givenNumber,index) => {
        let entry = `${givenNumber},${index},b`
        if(usedNumbers.includes(entry)){
            return (
                <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={true}/>
            )
        }
        else {
            return (
                <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={false}/>
            )
        }
})
    const mapProducedTiles = producedNumbers.map((givenNumber,index) => {
        let entry = `${givenNumber},${index},p`
        if(usedNumbers.includes(entry)){
            return (
                <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={true}/>
            )
        }
        else {
            return (
                <NumberTile setUsedNumbers={setUsedNumbers} usedNumbers={usedNumbers} activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabNumber={grabNumber} key={`${givenNumber} ${index}`} entry={entry} number={givenNumber} used={false}/>
            )
        }
})
    return (
    <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
    <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
    {mapProducedTiles}
    </Grid>
    <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
    {mapNumberTiles}
    </Grid>
    </Grid>
)
}

function howManyTimesUsed(num){
    if(usedNumbers){
    const checkUsed = usedNumbers.filter((usedNumber) => {
        return (usedNumber==num)
    })
    return checkUsed.length
}
    else {
        return 0
    }
}

    return (

        <Box
        container
        noValidate
        sx={{ mt: 1 }}
        style={{ justifyContent: "center" }}
        >
        {/* <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {spawnProducedTiles()}
        </Grid> */}
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
        {newSpawner()}
        </Grid>
        </Box>
    )
}

export default NumOptions