import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Box, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { useColorModeValue } from "./components/ui/color-mode";

import Navbar from "./custom_components/Navbar";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Box minH={"100vh"} bg={useColorModeValue("#fff", "#0b1114")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
