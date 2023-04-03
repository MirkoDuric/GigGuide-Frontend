import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import DisplayCarousel from "./Components/DisplayCarousel";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DisplayCarousel />} />
      </Routes>
    </div>
  );
}

export default App;
