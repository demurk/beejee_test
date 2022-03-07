import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import MainPage from "./pages/home";

import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </Provider>
    </Router>
  );
}
export default App;
