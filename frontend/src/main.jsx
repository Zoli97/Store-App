import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.jsx";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";
import { defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider theme={defaultSystem}>
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
