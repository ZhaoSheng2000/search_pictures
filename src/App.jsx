import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { Input } from "antd";

import { debounce } from "./utils/utils";

import "./App.css";

const { Search } = Input;

function App() {
  const [allImgs, setAllImgs] = useState([]);
  const [value, setValue] = useState("");
  const [searchImgs, setSearchImgs] = useState([]);

  const requestImgs = () => {
    return [
      "http://127.0.0.1:5500/src/assets/img1.png",
      "http://127.0.0.1:5500/src/assets/img2.png",
      "http://127.0.0.1:5500/src/assets/img3.png",
      "http://127.0.0.1:5500/src/assets/img4.png",
      "http://127.0.0.1:5500/src/assets/img5.png",
    ].map((img) => ({
      name: img,
      src: img,
    }));
  };

  const resolveImgs = async (obj) => {
    const o = { ...obj };

    return Tesseract.recognize(o.src, "eng")
      .then(({ data: { text } }) => {
        //成功则吧 text 放在 keyword 中
        return { ...o, keyword: text };
      })
      .catch(() => {
        //失败则把 src 放到 keyword 中
        return { ...o, keyword: o.src };
      });
  };

  const search = () => {
    console.log(value);
    const res = allImgs.filter(({ keyword }) => keyword.toLowerCase().includes(value.toLowerCase()));
    setSearchImgs(res);
  };

  useEffect(() => {
    const getImgs = async () => {
      const res = requestImgs();
      //解析文字
      let imgs = await Promise.all(res.map((o) => resolveImgs(o)));
      setAllImgs(imgs);
    };
    getImgs();
  }, []);


  return (
    <>
      <h1>Tesseract 图片解析文字</h1>

      <h2>所有图片</h2>

      {allImgs?.map((img) => {
        return (
          <img
            key={img.src}
            src={img.src}
            className="logo react"
            alt="picture"
          />
        );
      })}
      <Search
        placeholder="input value"
        onChange={(e) => setValue(e.target.value)}
        onSearch={search}
      />
      <div>
        <h2>图片搜索结果</h2>
        {searchImgs?.map((img) => {
          return (
            <img
              key={img.src}
              src={img.src}
              className="logo react"
              alt="picture"
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
