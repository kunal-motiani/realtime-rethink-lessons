import React from "react";

const Player = (props) => (
  <div className="player" style={{ borderColor: `${props.team}` }}>
    <h2>Player {props.number}</h2>
    <h3 style={{ fontFamily: "BioRhyme, serif" }}>Team : {props.team}</h3>
  </div>
);

export default Player;
