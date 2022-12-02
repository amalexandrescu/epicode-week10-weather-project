import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import HomePage from "./components/HomePage.jsx";
import CityWeather from "./components/CityWeather.jsx";
import CityDetails from "./components/CityDetails.jsx";
import SavedPlaces from "./components/SavedPlaces.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:cityName" element={<CityWeather />} />
          <Route path="/:cityName/details" element={<CityDetails />} />
          <Route path="/savedPlaces" element={<SavedPlaces />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
