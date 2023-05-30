import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/App";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
// import logo from '@assets/img/logo.png'
import {getIStorageSync,setIStorageSync,removeIStorageSync} from  './utils'

console.log(chrome.storage)
refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "tl-helper-chrome-extension";
document.body.append(root);

const handleSendMessage = async (action:string, data:String | Object, callback:Function=null) => {
  // console.log(action,data)
  let result;
  if(action === 'getStorage'){
    result = getIStorageSync(data)
  }
  if(action === 'setStorage'){
    result = setIStorageSync(data.key, data.value)
  }
  if(action === 'removeStorage'){
    result = removeIStorageSync(data)
  }
  if(callback){
    callback(result)
  }else{
    return result
  }
}

createRoot(root).render(<App storage={chrome.storage} postMessage = {handleSendMessage}/>);
