import React from "react";
import "@pages/popup/Popup.css";
import "@pages/content/style.scss";
import App from '@src/pages/content/components/App'

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
      <App />
    </div>
  );
};

export default Popup;
