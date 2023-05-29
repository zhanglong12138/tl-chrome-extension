import { useEffect } from "react";

export default function Note() {
  useEffect(() => {
    console.log("tl-chrome-extension content script NOTE loaded");
  }, []);

  return <div className="w100 fl fc">
    <div className="component-body">Note</div>
</div>
}
