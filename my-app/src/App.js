import { useEffect, useState } from "react";

import "./App.css";

import gulya from "../src/gulya.gif";
import HB from "../src/HB.PNG";
import HBV from "../src/HB.mp4";
import guli1 from "../src/guli1.mp3";
import guli2 from "../src/guli2.mp3";
import guli3 from "../src/guli3.mp3";

function App() {
  const [rowArray, setRowArray] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const [gulR, setGulR] = useState(0);
  const [gulC, setGulC] = useState(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight - 43;
    const countOfRow = Math.floor(height / 100);
    const countOfColumn = Math.floor(width / 100);

    setRowArray([...Array(countOfRow)]);
    setColumnArray([...Array(countOfColumn)]);

    setGulR(Math.floor(Math.random() * countOfRow));
    setGulC(Math.floor(Math.random() * countOfColumn));
  }, []);

  const fly = (e, indexR, indexC) => {
    console.log(gulR, gulC);
    if (end) return;
    e.target.style.visibility = "hidden";

    const guliRandom = Math.floor(Math.random() * 3);

    const audio = new Audio(
      guliRandom === 0 ? guli1 : guliRandom === 1 ? guli2 : guli3
    );
    audio.volume = 0.2;

    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 3000);

    console.log(gulR, gulC);
    if (indexR === gulR && indexC === gulC) {
      setEnd(true);
      setRowArray([]);
      setColumnArray([]);

      const HB = document.getElementById("HB");
      HB.style.visibility = "visible";

      const width = window.innerWidth;
      const height = window.innerHeight;

      HB.style.top = height + "px";
      HB.style.right = width / 2 - 150 + "px";
      const vid = document.getElementById("myVideo");
      vid.volume = 0.2;
      vid.play();

      setTimeout(() => {
        HB.classList.add("goUP");
      }, 9000);
    }
  };

  return (
    <div className="App">
      {end ? (
        <h1> Congrats you found him</h1>
      ) : (
        <h1> Find the most strong GULYA</h1>
      )}
      {rowArray.map((row, indexR) => (
        <div className="raw" key={indexR}>
          {columnArray.map((col, indexC) => (
            <img
              key={indexC}
              className="gulya"
              src={gulya}
              alt="guli guli"
              onClick={(e) => fly(e, indexR, indexC)}
            />
          ))}
        </div>
      ))}
      <div className="strongGulya" id="HB">
        <img className="gulya" src={gulya} alt="guli guli" />
        <img className="HB" src={HB} alt="guli guli" />
        <video id="myVideo" width="347" height="190">
          <source src={HBV} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
