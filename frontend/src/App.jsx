import React from "react";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextContainer from "./store/store";

const App = () => {
  return (
    <ContextContainer>
      <ToastContainer />
      <Navbar />
    </ContextContainer>
  );
};

export default App;
