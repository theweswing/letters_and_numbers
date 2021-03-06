import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function NumberTile({setUsedNumbers,usedNumbers, number, grabNumber,hasReset,setHasReset,activeStep,used,entry}){
    const [clicked,setClicked]=useState(false)

    useEffect(() => {
        if(hasReset === true){
            setClicked(false)
            
        }
        if(used === true){
            setClicked(true)
        }
        if(used===false){
            setClicked(false)
        }
        // console.log(usedNumbers)
    },)


    function handleClick(e){
        let entry = e.target.value.split(",")
        if(activeStep.length ==0 || activeStep.length == 2){
        setHasReset(false)
        // setClicked(true)
        if(entry[0] !== 0){
        console.log(clicked)
        grabNumber(e)
        }
        let used = [...usedNumbers]
        used.push(e.target.value)
        setUsedNumbers(used)
    }
}

    if(!clicked){
        return (
            <Button
            onClick={handleClick}
            value={entry}
            variant="contained"
            sx={{
                margin: .5,
                width: 60,
                height: 60,
                variant: "contained",
                color: "white",
                backgroundColor: "#35D801",
                fontSize:"large",
                '&:hover': {
        borderWidth: "1px",
        borderColor: "yellow",
        boxShadow: 'none',
        backgroundColor: "#2FBD01"
      }
            }}
            >
            {number}
            </Button>
        )
    }
    else if(clicked){
        return (
            <Button
            disabled
            onClick={handleClick}
            value={0}
            color="error"
            variant="contained"
            sx={{
                ml: .5,
                mr: .5,
                margin: .5,
                width: 60,
                height: 60,
                variant: "contained",
                fontSize:"large",
    //             '&:hover': {
    //     backgroundColor: '#BD0A01',
    //     boxShadow: 'none',
    //   }
            }}
            >
            {number}
            </Button>
        )
    }
    
}

export default NumberTile