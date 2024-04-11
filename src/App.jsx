import { useState } from "react";
import Tesseract from "tesseract.js";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [keyword, setKeyword] = useState([]);

  const parseImage = async () => {
    Tesseract.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png',
      'eng'
    )
    .then(({ data: { text } })=>{
      console.log(text);
      setKeyword(text)
    })
    .catch(err=>{
      console.log(err);
    })
  };
  return (
    <>
      <h1>Tesseract 图片解析文字</h1>
      <div>
      <img src='https://tesseract.projectnaptha.com/img/eng_bw.png' className="logo react" alt="picture" />
      </div>
      <div className="card">
        <button onClick={parseImage}>解析图片</button>
        <p>
          <code>解析结果：{keyword}</code>
        </p>
      </div>
    </>
  );
}

export default App;
