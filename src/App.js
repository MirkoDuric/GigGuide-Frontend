import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import LandingPage from "./Views/LandingPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
