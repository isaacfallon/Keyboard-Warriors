import { useState, useEffect, useRef } from 'react';

const Countdown = ({ duration }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1000);
        }, 1000)
    }, [time]);

    function getFormattedTime(milliseconds) {
        let totalSeconds = parseInt(Math.floor(milliseconds/1000));
        let seconds = parseInt(totalSeconds % 60);

        return `${seconds}`;
    }

    return <div>{getFormattedTime(time)}</div>;
}

export default Countdown;