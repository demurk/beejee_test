import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import MainPage from "./pages/home";
import Navbar from "./components/navbar";
import Alert from "./components/alert";

import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
        <Alert />
      </Provider>
    </Router>
  );
}
export default App;
