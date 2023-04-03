import { Routes, Route } from "react-router-dom";
import Signup from "./view/Signup";
import Login from "./view/Login";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
