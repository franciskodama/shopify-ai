import { useState } from "react";
import "./App.css";
import "../src/utils/reset.css";
import "../src/utils/fonts.css";
import Main from "./pages/Main";
import Palette from "./components/Palette";

function App() {
  const root = document.querySelector(":root");

  const [isActive, setIsActive] = useState({
    first: true,
    second: false,
    third: false,
  });

  const firstColors = () => {
    root.style.setProperty("--color-dark", "#1c1c1c");
    root.style.setProperty("--color-bright", "#ffffff");
    root.style.setProperty("--color-third", "#ed1c24");
    setIsActive({
      first: true,
      second: false,
      third: false,
    });
  };

  const secondColors = () => {
    root.style.setProperty("--color-dark", "#29335C");
    root.style.setProperty("--color-bright", "#669BBC");
    root.style.setProperty("--color-third", "#F3A712");
    setIsActive({
      first: false,
      second: true,
      third: false,
    });
  };

  const thirdColors = () => {
    root.style.setProperty("--color-dark", "#757575");
    root.style.setProperty("--color-bright", "#ffffff");
    root.style.setProperty("--color-third", "#03A9F4");
    setIsActive({
      first: false,
      second: false,
      third: true,
    });
  };

  return (
    <div className="App">
      <Main />
      <Palette
        firstColors={firstColors}
        secondColors={secondColors}
        thirdColors={thirdColors}
        isActive={isActive}
      />
    </div>
  );
}

export default App;
