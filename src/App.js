import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./view/Signup";
import Login from "./view/Login";
import FanProfilepage from "./view/FanProfilepage";
import LandingPage from "./view/Landingpage";
import HomePage from "./view/Homepage";
import SearchPage from "./view/Searchpage";
import CustomNav from "./Components/CustomNav";

// import "./App.css";
const App = () => {
  return (
    <>
      <CustomNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/user/fan/:id" element={<FanProfilepage />} />
        <Route path="/artist/:id" element={<FanProfilepage />} />
        <Route
          path="/search/:name/:country/:city/:genre"
          element={<SearchPage />}
        />
      </Routes>
    </>
  );
};

export default App;
