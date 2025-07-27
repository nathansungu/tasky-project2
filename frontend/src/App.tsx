import "./App.css";
import { BrowserRouter } from "react-router-dom";
import HandleRouting from "./routes/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <HandleRouting />
      </BrowserRouter>
    </>
  );
}

export default App;
