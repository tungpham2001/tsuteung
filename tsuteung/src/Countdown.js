import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import Spritesheet from "react-responsive-spritesheet";
import ButtonClickSound from "./sound/buttonSound2.mp3";
import AlertSound from "./sound/alertSound.mp3";

const cheers = [
    "harness the power of focus and watch your dreams come true",
    "stay in the zone and unlock your full potential",
    "let your determination drive your concentration",
    "stay hydrated",
    "tsuteung loves u <3",
    "keep up the good work",
    "remember to take a break once in a while!!",
]; // Array of different cheers

const useStyles = createUseStyles({
    container: {
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "1rem",
    },
    timerButton: {
        background: "lightyellow",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textDecoration: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        width: '150px',
        fontFamily: "Poppins, monospace",
        height: '90px',
        cursor: 'pointer',
        border: '3px solid rgb(32, 182, 132)',
        borderRadius: '5px',
        transition: 'all 0.7s ease-in-out',
        margin: '0 50px', // Gap between buttons
        color: 'rgb(32, 182, 132)',
        fontSize: "25px",
        zIndex: 10,

        '&:hover, &:focus': {
            color: '#000',
            fontWeight: "bolder",
            opacity: 1,
            transform: "scale(1.1)",

            '&:before': {
                width: '100%',
                backgroundColor: '#99ccff',
            },

            '& button': {
                border: '1px solid #ffe045',
                opacity: 1,
                '&:before': {
                    width: 0,
                },
            },
        },

        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: '100%',
            backgroundColor: 'lightgreen',
            zIndex: -1,
            transition: 'all 0.7s ease-in-out',
        },

        '& button': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50px',
            marginTop: '-8px',
            marginLeft: '-5px',
            textAlign: 'center',
            fontSize: '16px',
            outline: 'none',
            borderRadius: 0,
            opacity: 1,
            transition: 'all 0.7s ease-in-out',
            cursor: 'pointer',
            color: '#000',
            zIndex: 2,

            '&:hover, &:focus': {
                color: '#000',
                backgroundColor: '#ffe045',
            },

            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50px',
                backgroundColor: '#fff',
                zIndex: 0,
                transition: 'all 0.7s ease-in-out',
            },

            '& span': {
                position: 'relative',
                zIndex: 3,
                color: '#000',
            },
        },
    },
    buttonContainer: {
        display: 'flex', // Buttons in a row
        justifyContent: 'center', // Center buttons horizontally
        marginTop: '30px', // Gap between inputs and buttons
    },
    inputFieldContainer: {
        fontFamily: "Poppins, monospace",
        display: 'flex',
        padding: "3rem",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: 'border-box',
        border: '5px solid rgb(32, 182, 132)',
        borderRadius: '20px',
        marginTop: "1rem",
        background: "linear-gradient(45deg, rgba(173, 216, 230, 0.2), rgba(144, 238, 144, 0.2))",
    },
    inputField: {
        flex: '1',
        margin: '0 10px',
        position: 'relative',
        justifyContent: "center",
        alignItems: "center",
    },
    inputFieldInput: {
        width: '11vw',
        height: "11vw",
        boxSizing: 'border-box',
        border: '5px solid rgb(32, 182, 132)',
        borderRadius: '15px',
        outline: 'none',
        fontSize: '70px',
        textAlign: "center",
        fontFamily: "Poppins, monospace",
        color: "cornflowerblue",
    },
    timeSeparator: {
        fontSize: "70px",
        fontWeight: "bolder",
        color: "rgb(32, 182, 132)",
        fontFamily: "Poppins, monospace",
    },
    timerDisplay: {
        fontFamily: "Poppins, monospace",
        display: 'flex',
        padding: "3rem",
        gap: "10px",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: 'border-box',
        border: '5px solid rgb(32, 182, 132)',
        borderRadius: '20px',
        marginTop: "1rem",
        background: "linear-gradient(45deg, rgba(173, 216, 230, 0.2), rgba(144, 238, 144, 0.2))",
    },
    timerDisplayBox: {
        width: '11vw',
        boxSizing: 'border-box',
        border: '5px solid rgb(32, 182, 132)',
        borderRadius: '15px',
        fontSize: '70px',
        fontFamily: "Poppins, monospace",
        height: "11vw",
        color: "darkseagreen",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        background: "white",
    },
    spriteBox: {
        flex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '25%',
        height: '100%',
    },
    sprite: {
        width: "10vw",
        height: "10vw",
    },
    cheerText: {
        color: "lightblue",
        fontFamily: "Krub",
        fontSize: "30px",
        fontWeight: "bolder",
        lineHeight: "48px",
        padding: "2rem",
        textAlign: "center",
        animation: "$pulse 5s infinite",
    },
    "@keyframes pulse": {
        "0%": {
          opacity: 0.5,
          transform: "scale(1)",
        },
        "50%": {
          opacity: 1,
          transform: "scale(1.1)",
        },
        "100%": {
          opacity: 0.5,
          transform: "scale(1)",
        },
    },
    timePresetContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: "2vw",
    },
    timePresetButton: {
        background: "lightpurple",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textDecoration: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        width: '130px',
        fontFamily: "Poppins, monospace",
        height: '60px',
        cursor: 'pointer',
        border: '3px solid cornflowerblue',
        borderRadius: '5px',
        transition: 'all 0.3s ease-in-out',
        margin: '0 20px', // Gap between buttons
        color: 'cornflowerblue',
        fontSize: "15px",
        zIndex: 10,

        '&:hover, &:focus': {
            color: '#002244',
            fontWeight: "bolder",
            opacity: 1,
            transform: "scale(1.05)",

            '&:before': {
                width: '100%',
                backgroundColor: '#B0C4DE',
            },

            '& button': {
                border: '1px solid #ffe045',
                opacity: 1,
                '&:before': {
                    width: 0,
                },
            },
        },

        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: '100%',
            backgroundColor: 'violet',
            zIndex: -1,
            transition: 'all 0.7s ease-in-out',
        },

        '& button': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50px',
            marginTop: '-8px',
            marginLeft: '-5px',
            textAlign: 'center',
            fontSize: '16px',
            outline: 'none',
            borderRadius: 0,
            opacity: 1,
            transition: 'all 0.7s ease-in-out',
            cursor: 'pointer',
            color: '#000',
            zIndex: 2,

            '&:hover, &:focus': {
                color: '#000',
                backgroundColor: '#ffe045',
            },

            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50px',
                backgroundColor: '#fff',
                zIndex: 0,
                transition: 'all 0.7s ease-in-out',
            },

            '& span': {
                position: 'relative',
                zIndex: 3,
                color: '#000',
            },
        },
    },
});

function Countdown(props) {
    const classes = useStyles();
    const [countdownTime, setCountdownTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [timerActive, setTimerActive] = useState(false);
    const [showInputs, setShowInputs] = useState(true);
    const { isSoundEnabled, isAlarmEnabled, volume } = props;

    const playAlertSound = useCallback(() => {
        const alert = new Audio(AlertSound);
        alert.volume = volume;
        alert.play();
    }, [volume]);

    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setCountdownTime((prevTime) => {
                const { hours, minutes, seconds } = prevTime;
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    if (isAlarmEnabled) {
                        playAlertSound();
                    }
                    clearInterval(interval);
                    setTimerActive(false);
                    setShowInputs(true);
                    return prevTime;
                }
                if (minutes === 0 && seconds === 0) {
                    return { hours: hours - 1, minutes: 59, seconds: 59 };
                }
                if (seconds === 0) {
                    return { hours, minutes: minutes - 1, seconds: 59 };
                }

                return { hours, minutes, seconds: seconds - 1 };
            });
        }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, isAlarmEnabled, playAlertSound]);

    const [currentCheerIndex, setCurrentCheerIndex] = useState(0);

    useEffect(() => {
        const cheerCount = cheers.length;
        const timeoutDuration = 9000; // Adjust the duration as needed (in milliseconds)

        const timer = setTimeout(() => {
        setCurrentCheerIndex((prevIndex) => (prevIndex + 1) % cheerCount);
        }, timeoutDuration);

        return () => clearTimeout(timer);
    }, [currentCheerIndex]);

    const startCountdown = () => {
        if (isSoundEnabled) {
            const audio = new Audio(ButtonClickSound);
            audio.volume = volume;
            audio.play();
        }
        setTimerActive(true);
        setShowInputs(false);
    };

    const stopCountdown = () => {
        if (isSoundEnabled) {
            const audio = new Audio(ButtonClickSound);
            audio.volume = volume;
            audio.play();
        }
        setTimerActive(false);
        setShowInputs(true);
    };

    const resetCountdown = () => {
        if (isSoundEnabled) {
            const audio = new Audio(ButtonClickSound);
            audio.volume = volume;
            audio.play();
        }
        setCountdownTime({ hours: 0, minutes: 0, seconds: 0 });
        setTimerActive(false);
        setShowInputs(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 0) {
            parsedValue = 0;
        } else if (name === 'hours' && parsedValue > 999) {
            parsedValue = 999;
        } else if (name === 'minutes' && parsedValue > 59) {
            parsedValue = 59;
        } else if (name === 'seconds' && parsedValue > 59) {
            parsedValue = 59;
        }
        setCountdownTime((prevTime) => ({
        ...prevTime,
        [name]: parsedValue
        }));
    };

    const handleInputClick = (e) => {
        e.target.select();
    };

    return (
        <div className={classes.container}>
            {showInputs && (
                <div>
                    <div className={classes.timePresetContainer}>
                        <button 
                            className={classes.timePresetButton} 
                            onClick={() => setCountdownTime({ hours: 0, minutes: 50, seconds: 0 })}
                        >
                            pomodoro
                        </button>
                        <button 
                            className={classes.timePresetButton}
                            onClick={() => setCountdownTime({ hours: 0, minutes: 10, seconds: 0 })}
                        >
                            break time
                        </button>
                        <button 
                            className={classes.timePresetButton}
                            onClick={() => setCountdownTime({ hours: 0, minutes: 15, seconds: 0 })}
                        >
                            meditate
                        </button>
                    </div>
                    <div className={classes.inputFieldContainer}>
                        <div className={classes.inputField}>
                            <input
                                type="number"
                                name="hours"
                                value={countdownTime.hours.toString().padStart(2, '0')}
                                className={classes.inputFieldInput}
                                onChange={handleInputChange}
                                onClick={handleInputClick}
                                placeholder="hr"
                                min="0"
                                max="100"
                            />
                        </div>
                        <p className={classes.timeSeparator}>:</p>
                        <div className={classes.inputField}>
                            <input
                                type="number"
                                name="minutes"
                                value={countdownTime.minutes.toString().padStart(2, '0')}
                                className={classes.inputFieldInput}
                                onChange={handleInputChange}
                                onClick={handleInputClick}
                                placeholder="min"
                                min="0"
                                max="59"
                            />
                        </div>
                        <p className={classes.timeSeparator}>:</p>
                        <div className={classes.inputField}>
                            <input
                                type="number"
                                name="seconds"
                                value={countdownTime.seconds.toString().padStart(2, '0')}
                                className={classes.inputFieldInput}
                                onClick={handleInputClick}
                                onChange={handleInputChange}
                                placeholder="sec"
                                min="0"
                                max="59"
                            />
                        </div>
                    </div>
                </div>
            )}
            {timerActive && (
                <div className={classes.timerDisplay}>
                    <div className={classes.timerDisplayBox}>
                        {countdownTime.hours.toString().padStart(2, '0')}
                    </div>
                    <h2 className={classes.timeSeparator}>:</h2>
                    <div className={classes.timerDisplayBox}>
                        {countdownTime.minutes.toString().padStart(2, '0')}
                    </div>
                    <h2 className={classes.timeSeparator}>:</h2>
                    <div className={classes.timerDisplayBox}>
                        {countdownTime.seconds.toString().padStart(2, '0')}
                    </div>
                </div>
            )}
            <div className={classes.buttonContainer}>
                <button 
                    className= {classes.timerButton} 
                    onClick={startCountdown} 
                    disabled={timerActive || !showInputs}>START
                </button>
                <button className= {classes.timerButton} onClick={stopCountdown}>STOP</button>
                <button className= {classes.timerButton} onClick={resetCountdown}>RESET</button>
            </div>
            {timerActive && (
                <div className={classes.spriteBox}>
                    <Spritesheet
                        className={classes.sprite}
                        image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
                        widthFrame={420}
                        heightFrame={500}
                        steps={14}
                        fps={10}
                        autoplay={true}
                        loop={true}
                    />
                </div>
            )}
            {timerActive && (
                <div className={classes.cheerText}>
                    {cheers[currentCheerIndex]}
                </div>
            )}
        </div>
    );
}

export default Countdown;