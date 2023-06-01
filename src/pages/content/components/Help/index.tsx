import { useEffect } from "react";

export default function Help(props) {
  useEffect(() => {
    console.log("Help loaded");
  }, []);

  return <div className="w100 fl fc">
    <div className="component-body">
    Ctrl+Shift+F 或 Ctrl+Alt+Q 查询操作
    <br />
    Ctrl+Q 或 Ctrl+I 新增操作
    </div>
</div>
}
