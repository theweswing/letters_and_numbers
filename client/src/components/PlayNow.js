import {useState,useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AbcIcon from '@mui/icons-material/Abc';
import CalculateIcon from '@mui/icons-material/Calculate';
import Divider from '@mui/material/Divider';

function PlayNow(){

    useEffect(() => {
        fetch(`/letter_games`)
          .then((res) => res.json())
          .then((game_data) => {
            console.log(game_data);
            let todaysGame = findTodaysGame(game_data)
            console.log(todaysGame)
          });
      }, []);

    function findTodaysGame(all_games){
        let today = new Date().toISOString().slice(0, 10)
        const todaysGame = all_games.filter((game) => {
            return game.date == today
        })
        return todaysGame
    }
    return (
        <>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", mt: 2}}>
                Letters & Numbers
            </Typography>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, textAlign: "center", mt: 2, mb:2}}>
                Two 30 second Daily Quiz Games!
            </Typography>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, textAlign: "center", mt: 2, mb:2}}>
                Play today's games:
            </Typography>
            <Stack 
            justifyContent="center" 
            direction="row" spacing={2}  
            divider={<Divider orientation="vertical" flexItem />}
            >
                <Button size= "large" variant="contained" endIcon={<AbcIcon/>}>
                    LETTERS
                </Button>
                <Button size="large" variant="contained" endIcon={<CalculateIcon />}>
                    NUMBERS
                </Button>
            </Stack>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, textAlign: "center", mt: 2, mb:2}}>
                Or try a practice round:
            </Typography>
            <Stack 
            justifyContent="center" 
            direction="row" spacing={2}  
            divider={<Divider orientation="vertical" flexItem />}
            >
                <Button size= "medium" variant="contained" endIcon={<AbcIcon/>}>
                    Practice
                </Button>
                <Button size="medium" variant="contained" endIcon={<CalculateIcon />}>
                    Practice
                </Button>
            </Stack>
          </>
    )
}

export default PlayNow