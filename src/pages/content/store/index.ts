import React from 'react';
import {postx} from '../utils';
const globalContext = React.createContext({
  postx,
  postMessage:<any>function(action:string,data:any,callback:Function | null = null){}
});
export default globalContext;