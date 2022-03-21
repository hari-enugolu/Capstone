import "./App.css";
import Header from "./Components/Header/Header";
import Donation from "./Components/Donation/Donation";
import Slider from "./Components/Slider/Slider";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
