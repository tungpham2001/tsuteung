import React, { useState, useEffect } from "react";
import "./App.css";
import { createUseStyles } from "react-jss";
import Countdown from "./Countdown";
import Todo from "./Todo";
import RingLoader from "react-spinners/RingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DayNightToggle from 'react-day-and-night-toggle';
import { ChromePicker } from 'react-color';

const titles = ["tsuteung", "수똥", "pomodoro study buddy"]; // Array of different titles

const useStyles = createUseStyles({
  app: {
    background: "aliceblue",
    transition: "background-color 2s ease, color 2s ease",
  },
  appDarkMode: {
    background: "#343434",
    color: "white",
  },
  countdownBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "20px",
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
  settingContainer: {
    fontFamily: "Krub",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    justifyContent: "center",
    cursor: "pointer",
    padding: "2rem",
    border: "5px solid rgb(32, 182, 132)",
    borderRadius: "20px",
    background: "#A3C1AD",
    width: "40%",
  },
  settingButtonContainer: {
    fontFamily: "Krub",
    cursor: "pointer",
    paddingBottom: "2rem",
  },
  settingButton: {
    padding: "0.6rem",
    borderRadius: "10px",
    border: "3px solid rgb(32, 182, 132)",
    fontSize: "1rem",
    lineHeight: "1.5",
    background: "lightyellow",
    color: "rgb(32, 182, 132)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.2)",
      background: "#EEDC82",
    },
  },
  settingTheme: {
    textAlign: "left",
  },
  settingSFX: {
    textAlign: "left",
  },
  settingCloseButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  settingCloseButton: {
    padding: "0.6rem",
    borderRadius: "10px",
    border: "3px solid rgb(32, 182, 132)",
    fontSize: "1rem",
    lineHeight: "1.5",
    background: "lightyellow",
    color: "rgb(32, 182, 132)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.2)",
      background: "#EEDC82",
    },
  },
  settingType: {
    color: "lightgoldenrodyellow",
  },
  darkModeToggle: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  darkMode: {
    display: "flex",
    alignItems: "center",
  },
  darkModeText: {
    marginRight: "3.1vw",
  },
  darkModeToggleWrapper: {
    marginLeft: "3.1vw",
    marginTop: "1vw",
  },
});

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  useEffect(() => {
    const titleCount = titles.length;
    const timeoutDuration = 3000; // Adjust the duration as needed (in milliseconds)
    const timer = setTimeout(() => {
      setLoading(false);
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titleCount);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [currentTitleIndex]);

  useEffect(() => {
    const appElement = document.querySelector("." + classes.app);
    if (appElement) {
      if (darkMode) {
        appElement.classList.add(classes.appDarkMode);
      } else {
        appElement.classList.remove(classes.appDarkMode);
      }
    }
  }, [darkMode, classes.app, classes.appDarkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    const newBackgroundColor = darkMode ? "" : "black";
    setBackgroundColor(newBackgroundColor);
    document.body.style.backgroundColor = newBackgroundColor;
  };

  return (
    <div className={classes.app} style={{ backgroundColor }}>
      {loading ? (
        <div className={classes.loadScreen}>
          <RingLoader size={500} color="lightgreen" speedMultiplier={0.5} />
        </div>
      ) : (
        <div className={classes.content}>
          <div className={classes.heading}>
            <h1 className={classes.title}>{titles[currentTitleIndex]}</h1>
          </div>
          <div className={classes.settingButtonContainer}>
            <button className={classes.settingButton} onClick={openSettings}>
              setting
              <FontAwesomeIcon
                icon={faGear}
                spinPulse
                style={{
                  color: "rgb(32, 182, 132)",
                  marginLeft: "7px",
                }}
                size="2xl"
              />
            </button>
          </div>
          {isSettingsOpen && (
            <SettingsPage
              onClose={closeSettings}
              darkMode={darkMode}
              handleDarkModeToggle={handleDarkModeToggle}
              backgroundColor={backgroundColor}
              handleColorChange={handleColorChange}
            />
          )}
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

function SettingsPage({ onClose, darkMode, handleDarkModeToggle, backgroundColor, handleColorChange }) {
  const classes = useStyles();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={classes.settingContainer}>
      <div className={classes.settingTheme}>
        <h1 className={classes.settingType}>Theme</h1>
        <div className={classes.darkMode}>
          <div className={classes.darkModeText}>
            dark mode (PLEASE WAIT 3s BEFORE CLICKING AGAIN)
          </div>
          <div className={classes.darkModeToggleWrapper}>
            <DayNightToggle
              className={classes.darkModeToggle}
              checked={isDarkMode}
              onClick={handleDarkModeToggle}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
          </div>
          {/* <ToggleButton
            className={classes.darkModeToggle}
            type="checkbox"
            variant={darkMode ? "light" : "dark"}
            style={{
              marginLeft: "20vw",
            }}
            onClick={handleDarkModeToggle}
          >
            {darkMode ? "switch to light mode" : "switch to dark mode"}
          </ToggleButton> */}
        </div>
        <p>
          change background color
          <ChromePicker color={backgroundColor} onChange={handleColorChange} />
        </p>
        <p>change font</p>
      </div>
      <div className={classes.settingSFX}>
        <h1 className={classes.settingType}>SFX and Effects</h1>
        <p>alarm sound</p>
        <p>enable sfx</p>
        <p>background music during countdown</p>
      </div>
      <div className={classes.settingCloseButtonContainer}>
        <button className={classes.settingCloseButton} onClick={onClose}>
          close
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            beat
            style={{
              color: "rgb(32, 182, 132)",
              marginLeft: "7px",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default App;
