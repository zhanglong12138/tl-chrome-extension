import { useEffect } from "react";

export default function Help(props) {
  useEffect(() => {
    console.log("Help loaded");
  }, []);

  return <div className="w100 fl fc">
    <div className="component-body">Help</div>
</div>
}
