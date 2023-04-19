import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./view/Signup";
import Login from "./view/Login";
import LandingPage from "./view/Landingpage";
import HomePage from "./view/Homepage";
import SearchPage from "./view/Searchpage";
import CustomNav from "./Components/CustomNav";
import LocalBandsPage from "./view/Localbandspage";
import UserProfilepage from "./view/UserProfilepage";
import EventPage from "./view/Eventpage";

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
        <Route path="/localartists" element={<LocalBandsPage />} />
        <Route path="/userprofile/:userId" element={<UserProfilepage />} />
        <Route path="/:userId/event/:eventId" element={<EventPage />} />
        <Route
          path="/search/:name/:country/:city/:genre"
          element={<SearchPage />}
        />
      </Routes>
    </>
  );
};

export default App;
