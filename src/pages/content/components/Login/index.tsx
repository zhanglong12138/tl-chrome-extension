import { useEffect } from "react";
import "./index.less";

export default function App() {
  useEffect(() => {
    console.log("tl-chrome-extension content script loaded");
  }, []);

  return <div className="tl-chrome-extension-container">

  </div>;
}
