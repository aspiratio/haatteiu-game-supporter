import { BrowserRouter } from "react-router-dom";

import { Router } from "./router/Router";

function App() {
  return (
    <div className="min-h-screen w-screen font-body text-base bg-yellow-50 text-gray-500">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
