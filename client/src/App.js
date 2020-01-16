import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./components/AppNavBar";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <div className="App">
      <AppNavBar></AppNavBar>
      <ShoppingList></ShoppingList>
    </div>
  );
}

export default App;
