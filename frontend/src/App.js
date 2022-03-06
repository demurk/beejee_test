import React from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
    </Routes>
  );
}
export default App;
