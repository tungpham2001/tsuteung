import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    timerButton: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textDecoration: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80px',
        fontFamily: "Poppins, monospace",
        height: '50px',
        cursor: 'pointer',
        border: '3px solid cornflowerblue',
        borderRadius: '5px',
        transition: 'all 0.7s ease-in-out',
        margin: '0 20px', // Gap between buttons
        color: '#000',
        zIndex: 10,

        '&:hover, &:focus': {
            color: '#000',
            fontWeight: "bolder",
            opacity: 1,

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
        marginTop: '20px', // Gap between inputs and buttons
    },
    inputFieldContainer: {
        padding: "3rem",
        display: 'flex',
        gap: "30px",
        border: "5px solid cornflowerblue",
        borderRadius: "30px",
        background: "linear-gradient(45deg, rgba(173, 216, 230, 0.2), rgba(144, 238, 144, 0.2))",
    },
    inputField: {
        flex: '1',
        margin: '0 5px',
        position: 'relative',
    },
    inputFieldInput: {
        width: '100%',
        height: '105px',
        padding: '5px',
        boxSizing: 'border-box',
        border: '3px solid cornflowerblue',
        borderRadius: '5px',
        outline: 'none',
    },
    timeSeparator: {
        fontSize: "28px",
        fontWeight: "bolder",
        color: "cornflowerblue",
    },
});

function Countdown() {
    const classes = useStyles();
    const [countdownTime, setCountdownTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [timerActive, setTimerActive] = useState(false);
    const [showInputs, setShowInputs] = useState(true);

    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setCountdownTime((prevTime) => {
                const { hours, minutes, seconds } = prevTime;
                if (hours === 0 && minutes === 0 && seconds === 0) {
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
    }, [timerActive]);

    const startCountdown = () => {
        setTimerActive(true);
        setShowInputs(false);
    };

    const stopCountdown = () => {
        setTimerActive(false);
        setShowInputs(true);
    };

    const resetCountdown = () => {
        setCountdownTime({ hours: 0, minutes: 0, seconds: 0 });
        setTimerActive(false);
        setShowInputs(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 0) {
            parsedValue = 0;
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

    return (
        <div className={classes.container}>
            {showInputs && (
                <div className={classes.inputFieldContainer}>
                    <div className={classes.inputField}>
                        <input
                            type="number"
                            name="hours"
                            value={countdownTime.hours || ''}
                            className={classes.inputFieldInput}
                            onChange={handleInputChange}
                            min="0"
                        />
                    </div>
                    <p className={classes.timeSeparator}>:</p>
                    <div className={classes.inputField}>
                        <input
                            type="number"
                            name="minutes"
                            value={countdownTime.minutes || ''}
                            className={classes.inputFieldInput}
                            onChange={handleInputChange}
                            min="0"
                            max="59"
                        />
                    </div>
                    <p className={classes.timeSeparator}>:</p>
                    <div className={classes.inputField}>
                        <input
                            type="number"
                            name="seconds"
                            value={countdownTime.seconds || ''}
                            className={classes.inputFieldInput}
                            onChange={handleInputChange}
                            min="0"
                            max="59"
                        />
                    </div>
                </div>
            )}
            <div className={classes.buttonContainer}>
                <button className= {classes.timerButton} onClick={startCountdown} disabled={timerActive || !showInputs}>
                START
                </button>
                <button className= {classes.timerButton} onClick={stopCountdown}>STOP</button>
                <button className= {classes.timerButton} onClick={resetCountdown}>RESET</button>
            </div>
            <div>
                <h2>
                {countdownTime.hours.toString().padStart(2, '0')}:
                {countdownTime.minutes.toString().padStart(2, '0')}:
                {countdownTime.seconds.toString().padStart(2, '0')}
                </h2>
            </div>
        </div>
    );
}

export default Countdown;