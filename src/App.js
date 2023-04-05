import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import SearchBar from "./Components/SearchBar";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchBar />} />
      </Routes>
    </div>
  );
}

export default App;
