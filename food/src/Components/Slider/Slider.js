import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import "./slider.css";
import sliderImage from "./sliderImage";

const len = sliderImage.length - 1; //length of the image -1
// console.log(sliderImage.length - 1);

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log(activeIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);
  // console.log(setActiveIndex);
  return (
    <div className="slider-container">
      <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />
    </div>
  );
}

export default Slider;
