import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { CreateRoom } from "./pages/CreateRoom";
import { Entrance } from "./pages/Entrance";
import { Game } from "./pages/Game";
import { EnterRoom } from "./pages/EnterRoom";
import { Top } from "./pages/Top";

function App() {
  return (
    <div className="h-screen bg-yellow-50">
      <BrowserRouter>
        <Header />
        <div>
          {/* <Link to="/">Top</Link>
        <Link to="/create-room">CreateRoom</Link>
        <Link to="/join-room">JoinRoom</Link>
        <Link to="/entrance">Entrance</Link>
        <Link to="/game">Game</Link> */}
        </div>
        <Switch>
          <Route exact path="/">
            <Top />
          </Route>
        </Switch>
        <Switch>
          <Route path="/create-room">
            <CreateRoom />
          </Route>
        </Switch>
        <Switch>
          <Route path="/enter-room">
            <EnterRoom />
          </Route>
        </Switch>
        <Switch>
          <Route path="/entrance">
            <Entrance />
          </Route>
        </Switch>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
