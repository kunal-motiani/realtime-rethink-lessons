import React, { Component } from "react";
import openSocket from "socket.io-client";
import Player from "./Player";
import "./App.css";

const socket = openSocket("http://localhost:8000");

const rollDice = () => {
  socket.emit("reset");
};

class App extends Component {
  constructor(props) {
    super(props);

    socket.on("timer", (countdown) => {
      console.log(JSON.stringify(countdown));
      this.setState({ countdown });
    });
  }

  state = {
    countdown: "",
    players: [],
  };

  componentDidMount() {
    console.log("Component Mounted");
    socket.on("currentPlayers", (players) => {
      console.log(JSON.stringify(players));
      this.setState({ players });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component Updated");
    socket.on("currentPlayers", (players) => {
      console.log(JSON.stringify(players));
      this.setState({ players });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 style={{ textAlign: "center" }}>Player Counters</h2>
        </div>
        <div className="players">
          {this.state.players.map((player, i) => (
            <Player
              number={player.playerNumber}
              key={player.playerNumber}
              team={player.team}
            />
          ))}
        </div>
        <div className="timer">
          <h3>Time Remaining : {this.state.countdown}</h3>
          <button onClick={rollDice}>Roll Dice!</button>
        </div>
      </div>
    );
  }
}

export default App;
