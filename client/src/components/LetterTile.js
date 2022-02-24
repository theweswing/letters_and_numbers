import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function LetterTile({letter, grabLetter,reset}){
    const [clicked,setClicked]=useState(false)

    useEffect(() => {
        if(reset == true){
            setClicked(false)
        }
    })


    function handleClick(e){
        if(e.target.value !== 0){
        grabLetter(e)
        setClicked(true)
        console.log(e.target.value)
        }
    }

    if(!clicked){
        return (
            <Button
            onClick={handleClick}
            value={letter}
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
            {letter}
            </Button>
        )
    }
    else if(clicked){
        return (
            <Button
            disabled
            onClick={handleClick}
            value={0}
            sx={{
                ml: .5,
                mr: .5,
                margin: .5,
                width: 60,
                height: 60,
                variant: "contained",
                color: "white",
                backgroundColor: "red",
                fontSize:"large",
                '&:hover': {
        backgroundColor: '#BD0A01',
        boxShadow: 'none',
      }
            }}
            >
            {letter}
            </Button>
        )
    }
    
}

export default LetterTile