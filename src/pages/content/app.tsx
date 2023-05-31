import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/App";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import React from 'react'
import {getIStorageSync,setIStorageSync,removeIStorageSync, postx} from  './utils'
import globalContext from './store/index'

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "tl-helper-chrome-extension";
document.body.append(root);

const handleSendMessage = async (action:string, data:String | any, callback:Function=null) => {
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
    console.log(callback)
    callback(result)
  }else{
    return result
  }
}

const ComponentApp = () => {
  const sharedData = {
    postx,
    postMessage:handleSendMessage
  };
  return (
    <globalContext.Provider value={sharedData}>
      <App storage={chrome.storage} />
    </globalContext.Provider>
  );
};

createRoot(root).render(<ComponentApp />);
