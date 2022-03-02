import {useEffect} from 'react'

const Countdown = ({seconds,setSeconds}) => {

    useEffect(() => {
            let totalSeconds = 30
            let timeInterval = setInterval(setTime, 1000);
            function setTime() {
                if(totalSeconds > 0) {
                --totalSeconds;
                setSeconds(totalSeconds);
                }
            }
        
            function pad(val) {
                let valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
            return () => {
                timeInterval.clearInterval()
            }
        
    }, [])
    
    return (
        <div>
            <p>{seconds}</p>
        </div>
    )
}

export default Countdown