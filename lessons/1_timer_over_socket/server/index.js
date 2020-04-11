const io = require("socket.io")();
const countdownValue = 10;
let countdown = countdownValue;
let players = [];
let playerCounter = 0;

setInterval(() => {
  countdown--;
  if (countdown == 0) {
    countdown = countdownValue;
  }
  io.emit("timer", countdown);
}, 1000);

io.on("connection", (socket) => {
  console.log("Player : " + ++playerCounter);
  let player = {
    playerId: socket.id,
    playerNumber: playerCounter,
    team: Math.floor(Math.random() * 2) == 0 ? "red" : "blue",
  };
  players.push(player);
  console.log(JSON.stringify(players));
  io.emit("currentPlayers", players);
  socket.on("reset", () => {
    countdown = countdownValue;
    io.emit("timer", countdown);
  });
  socket.on("disconnect", (client) => {
    console.log("user is disconnecting : " + socket.id);
    let removeIndex = players
      .map((player) => player.playerId)
      .indexOf(socket.id);
    players.splice(removeIndex, 1);

    io.emit("currentPlayers", players);
  });
});

const port = 8000;
io.listen(port);
console.log("Listening on Port : " + port);
