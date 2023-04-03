import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import Event from "./Components/Event";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Event />} />
      </Routes>
    </div>
  );
}

export default App;
