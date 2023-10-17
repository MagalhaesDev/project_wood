import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ActivesContextProvider } from "./contexts/ActivesContext";
import { RegistersContextProvider } from "./contexts/RegistersContext";

export function App() {
  return (
    <BrowserRouter>
      <RegistersContextProvider>
        <ActivesContextProvider>
          <Router />
        </ActivesContextProvider>
      </RegistersContextProvider>
    </BrowserRouter>
  );
}
