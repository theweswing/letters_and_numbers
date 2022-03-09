import React, {useState } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function NumbersRules(){
    const [toggleRules,setToggleRules] = useState(false)

    function handleRules(){
        setToggleRules(!toggleRules)
    
    }
    return (
        <Grid item xs={12} sx={{ mb: 1 }} align="center"> 
                <Typography variant="h5">
                    NUMBERS {toggleRules ? 
            <ArrowDropDownIcon onClick={handleRules}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleRules}></ArrowRightIcon>}
                </Typography>
                {toggleRules && 
                <>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • You will be given six numbers and a target number.
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • Using basic operands ( + - * / )
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                And each number at most once:
                </Typography>
                <Typography variant="subtitle1" sx={{mb:.5}}>
                • Your goal is to get as close to the target as possible.
                </Typography>
                </>
                }
            </Grid>
    )
}

export default NumbersRules