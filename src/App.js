import { Router, Route } from "react-router-dom";
import Signup from "./view/Signup";
import Login from "./view/Login";
import Profilepage from "./view/Profilepage";
// import "./App.css";
const App = () => {
  return (
    <Router>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/fan" element={<Profilepage />} />
    </Router>
  );
};

export default App;
