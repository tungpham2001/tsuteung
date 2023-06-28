import React from "react";
import "./App.css"
import { createUseStyles } from "react-jss";
import Countdown from "./Countdown";

const useStyles = createUseStyles({
    countdownBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      //justifyContent: "center",
      height: "100vh",
    },
    countdownTitle: {
      fontSize: "40px",
    },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.countdownBox}>
        <Countdown/>
      </div>
    </div>
  );
}

export default App;