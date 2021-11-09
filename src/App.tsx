import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { CreateRoom } from "./pages/CreateRoom";
import { HostEntrance } from "./pages/HostEntrance";
import { Game } from "./pages/Game";
import { EnterRoom } from "./pages/EnterRoom";
import { Top } from "./pages/Top";
import { GuestEntrance } from "./pages/GuestEntrance";

function App() {
  return (
    <div className="h-screen w-screen font-body text-base bg-yellow-50 text-gray-500">
      <BrowserRouter>
        <Header />
        <div>
          {/* <Link to="/">Top</Link>
        <Link to="/create-room">CreateRoom</Link>
        <Link to="/join-room">JoinRoom</Link>
        <Link to="/host-entrance">Entrance</Link>
        <Link to="/guest-entrance">Entrance</Link>
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
          <Route path="/host-entrance">
            <HostEntrance />
          </Route>
        </Switch>
        <Switch>
          <Route path="/guest-entrance">
            <GuestEntrance />
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
