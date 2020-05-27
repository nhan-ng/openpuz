import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  CreateLobbyRequest,
  GameType,
} from "./gen/coordinator/v1/service_pb";
import { CoordinatorAPIPromiseClient } from "./gen/coordinator/v1/service_grpc_web_pb";

const client = new CoordinatorAPIPromiseClient(
  "http://localhost:8080",
  null,
  null
);
const request = new CreateLobbyRequest();
request.setGameType(GameType.GAME_TYPE_SUDOKU);

function App() {
  const onClick = async () => {
    try {
      const response = await client.createLobby(request, {});
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Create Lobby!</button>
      </header>
    </div>
  );
}

export default App;
