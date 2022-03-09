import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import OperandTile from "./OperandTile";

function Operands({}){

    function spawnOperandTiles(){
        const operands = ["+","-","*","/"]
        const mapOperandTiles = operands.map((operand) => {
            return (
                <OperandTile operand={operand} />
            )
        })
        return mapOperandTiles
    }
        return (
    
            <>
            {spawnOperandTiles()}
            </>
        )
    }
    
    export default Operands