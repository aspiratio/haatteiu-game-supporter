import { Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { CreateRoom } from "../pages/CreateRoom";
import { EnterRoom } from "../pages/EnterRoom";
import { Game } from "../pages/Game";
import { GuestEntrance } from "../pages/GuestEntrance";
import { HostEntrance } from "../pages/HostEntrance";
import { Top } from "../pages/Top";
import { Page404 } from "../pages/Page404";

export const Router = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/create-room">
          <CreateRoom />
        </Route>
        <Route exact path="/enter-room">
          <EnterRoom />
        </Route>
        <Route path="/enter-room/:id">
          <EnterRoom />
        </Route>
        <Route path="/host-entrance">
          <HostEntrance />
        </Route>
        <Route path="/guest-entrance">
          <GuestEntrance />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </>
  );
};
