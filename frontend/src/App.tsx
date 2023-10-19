import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ActivesContextProvider } from "./contexts/ActivesContext";

export function App() {
  return (
    <BrowserRouter>
        <ActivesContextProvider>
          <Router />
        </ActivesContextProvider>
    </BrowserRouter>
  );
}
