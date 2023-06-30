import React from "react";
import "./App.css"
import { createUseStyles } from "react-jss";
import Countdown from "./Countdown";
import Todo from "./Todo";

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
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '20px',
      // Add any other styles for the grid container
    },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.gridContainer}>
        <div className={classes.countdownBox}>
          <Countdown/>
        </div>
        <div className={classes.todoBox}>
          <Todo/>
        </div>
      </div>
    </div>
  );
}

export default App;