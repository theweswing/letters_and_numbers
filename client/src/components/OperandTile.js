import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function OperandTile({operand, grabOperand,hasReset,setHasReset,activeStep}){
    const [clicked,setClicked]=useState(false)

    useEffect(() => {
        if(hasReset==true || activeStep.length==0){
            setClicked(false)
            
        }
    },)


    function handleClick(e){
        if(activeStep.length==1){
        setClicked(true)
        setHasReset(false)
        if(e.target.value !== 0){
        console.log(clicked)
        grabOperand(e)
        setClicked(true)
        console.log(e.target.value)
        }
        console.log(clicked)
    }
    }

    if(!clicked){
        return (
            <Button
            onClick={handleClick}
            value={operand}
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
            {operand}
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
            {operand}
            </Button>
        )
    }
    
}

export default OperandTile