import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function LetterTile({letter}){
    const [clicked,setClicked]=useState(false)

    function handleClick(){
        setClicked(!clicked)
    }

    if(!clicked){
        return (
            <Button
            onClick={handleClick}
            sx={{
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
            onClick={handleClick}
            sx={{
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