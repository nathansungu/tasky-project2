import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PagesRoutes from "./routes/routes";

function App() {
  return (
      <BrowserRouter>
        <PagesRoutes />
      </BrowserRouter>
  );
}

export default App;
