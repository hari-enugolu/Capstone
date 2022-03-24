import "./App.css";
import Header from "./Components/Header/Header";
import Donation from "./Components/Donation/Donation";
import Slider from "./Components/Slider/Slider";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Maps from "./Components/Maps/Maps";
// import Email from "./Components/Email/Email";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={[<Header />, <Slider />, <Home />, <Footer />]}
          />
          <Route path="/donation" element={[<Donation />]} />
          <Route path="/orders" element={[<Maps />]} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
