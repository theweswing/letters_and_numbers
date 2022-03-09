import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function NumberTile({number, grabNumber,reset}){
    const [clicked,setClicked]=useState(false)

    useEffect(() => {
        if(reset === true){
            setClicked(false)
            
        }
    },[])


    function handleClick(e){
        setClicked(true)
        if(e.target.value !== 0){
        console.log(clicked)
        // grabLetter(e)
        setClicked(true)
        console.log(e.target.value)
        }
        console.log(clicked)
    }

    if(!clicked){
        return (
            <Button
            onClick={handleClick}
            value={number}
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