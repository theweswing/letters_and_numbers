import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function LetterRules(){
    const [toggleRules,setToggleRules] = useState(false)

    function handleRules(){
        setToggleRules(!toggleRules)
    
    }
    return (
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
                <Typography variant="h5">
                    LETTERS {toggleRules ? 
            <ArrowDropDownIcon onClick={handleRules}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleRules}></ArrowRightIcon>}
                </Typography>
                {toggleRules && 
                <>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • In 30 seconds, spell the longest word you can.
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • Use the buttons to spell out your word and <b>SUBMIT</b>
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • <b>Your score</b> = the length of the word you submitted.
                </Typography>
                <Typography variant="subtitle2" sx={{mb:.5, mt: 2}}>
                • You are not locked in to your first SUBMIT
                </Typography>
                <Typography variant="subtitle2" sx={{mb:.5}}>
                • When 30 seconds runs out, you will be scored on your most recent SUBMIT
                </Typography>
                <Typography variant="subtitle2" sx={{mb:.5}}>
                • If you do not submit a word, or your word does not exist, you will be scored 2 points.
                </Typography>
                <Typography variant="subtitle2">
                • Each set contains a "perfect" word that uses all 9 letters.
                </Typography>
                </>
                }
            </Grid>
    )
}

export default LetterRules