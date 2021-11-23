import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Router } from "./router/Router";

function App() {
  return (
    <div className="h-screen w-screen font-body text-base bg-yellow-50 text-gray-500">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
