import { Routes, Route } from "react-router-dom";
import Signup from "./view/Signup";
import Login from "./view/Login";
<<<<<<< HEAD
import FanProfilepage from "./view/FanProfilepage";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./Views/LandingPage";

// import "./App.css";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/fan" element={<FanProfilepage />} />
    </Routes>
=======
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
>>>>>>> f6604ad27c0caaa946a41b581e492b9ae710a8aa
  );
};

export default App;
