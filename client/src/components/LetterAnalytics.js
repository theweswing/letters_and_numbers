import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import Charty from "./Chart";
import LetterScoreChart from "./LetterScoreChart";
import LetterOriginalityChart from "./LetterOriginalityChart";

function LetterAnalytics({analytics}){
const [showScores,setShowScores] = useState(false)
const [showOriginality,setShowOriginality] = useState(false)

function handleShowScores(){
    setShowScores(!showScores)
    setShowOriginality(false)
}

function handleShowOriginality(){
    setShowScores(false)
    setShowOriginality(!showOriginality)
}
    return (
        <>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            wrap="nowrap"
            >
            <Grid item component={Button} onClick={handleShowScores} xs={4} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" size="medium">Score</Grid>
            <Grid item component={Button} onClick={handleShowOriginality} xs={4} sx={{mt:1, mb:1, ml:1, mr:1}} variant="contained" size="medium">Originality</Grid>
            </Grid>
       {showScores && <LetterScoreChart data={analytics} />}
       {showOriginality && <LetterOriginalityChart data={analytics} />}
        </>
    )
}

export default LetterAnalytics