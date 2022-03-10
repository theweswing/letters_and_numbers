import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import OperandTile from "./OperandTile";

function Operands({grabOperand,hasReset,setHasReset,activeStep}){

    function spawnOperandTiles(){
        const operands = ["+","-","*","/"]
        const mapOperandTiles = operands.map((operand) => {
            return (
                <OperandTile activeStep={activeStep} setHasReset={setHasReset} hasReset={hasReset} grabOperand={grabOperand} key={operand} operand={operand} />
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