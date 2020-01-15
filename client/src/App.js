import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./components/AppNavBar";
import AppNavBar from "./components/AppNavBar";

function App() {
  return (
    <div className="App">
      <AppNavBar></AppNavBar>
    </div>
  );
}

export default App;
