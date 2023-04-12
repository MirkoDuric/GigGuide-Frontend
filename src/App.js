import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import SearchBar from "./Components/SearchBar";
import SearchPage from "./view/Searchpage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route
          path="/search/:name/:country/:city/:genre"
          element={<SearchPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
