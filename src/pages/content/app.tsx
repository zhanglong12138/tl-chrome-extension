import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/App";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
// import logo from '@assets/img/logo.png'

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "tl-helper-chrome-extension";
document.body.append(root);

createRoot(root).render(<App />);
