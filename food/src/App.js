import "./App.css";
import Header from "./Components/Header/Header";
import Donation from "./Components/Donation/Donation";
import Slider from "./Components/Slider/Slider";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={[<Header />, <Slider />]} />
          <Route path="/donation" element={[<Donation />]} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
