import React, { useState, useEffect } from "react";
import "./App.css";
import { createUseStyles } from "react-jss";
import Countdown from "./Countdown";
import Todo from "./Todo";
import RingLoader from "react-spinners/RingLoader";

const titles = ["tsuteung", "츠트웅", "pomodoro study buddy"]; // Array of different titles

const useStyles = createUseStyles({
  app: {
    background: "aliceblue",
  },
  countdownBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "center",
    height: "100vh",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "20px",
    // Add any other styles for the grid container
  },
  title: {
    color: "#CEF0D4",
    fontFamily: "Krub",
    fontSize: "70px",
    fontWeight: "bold",
    lineHeight: "48px",
    padding: "4rem",
    textAlign: "center",
    textShadow: "1px 1px 2px #082b34",
    letterSpacing: "10px",
    animation: "$pulse 3s infinite",
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 0.5,
      transform: "scale(1)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.2)",
    },
    "100%": {
      opacity: 0.5,
      transform: "scale(1)",
    },
  },
  loadScreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#F7F7F7",
    animation: "$fade-out 5s",
    zIndex: 2,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    opacity: 1,
    animation: "$fade-in 3s",
  },
  "@keyframes fade-out": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
  "@keyframes fade-in": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const titleCount = titles.length;
    const timeoutDuration = 3000; // Adjust the duration as needed (in milliseconds)

    const timer = setTimeout(() => {
      setLoading(false);
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titleCount);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [currentTitleIndex]); // Add currentTitleIndex as a dependency

  return (
    <div className={classes.app}>
      {loading ? (
        <div className={classes.loadScreen}>
          <RingLoader size={500} color="lightgreen" speedMultiplier={0.5} />
        </div>
      ) : (
        <div className={classes.content}>
          <div className={classes.heading}>
            <h1 className={classes.title}>{titles[currentTitleIndex]}</h1>
          </div>
          <div className={classes.gridContainer}>
            <div className={classes.countdownBox}>
              <Countdown />
            </div>
            <div className={classes.todoBox}>
              <Todo />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;