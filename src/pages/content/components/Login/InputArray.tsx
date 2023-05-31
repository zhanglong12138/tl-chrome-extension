import { useState, useEffect,  } from 'react'
import {Form, Input, Button, Space} from 'antd'
import {MinusCircleOutlined} from '@ant-design/icons'
const InputArray = (props)=>{
  const [arr,setArr] = useState([{key:'',value:''}])
  useEffect(() => {
    setArr(props?.value || [])
  }, [props]);
  const optionChange = (i,k,v)=>{
    arr[i][k] = v.target.value
    setArr([...arr])
    props?.onChange([...arr])
  }
  const del = (i)=>{
    arr.splice(i,1)
    setArr([...arr])
    props?.onChange([...arr])
  }
  const add = ()=>{
    arr.push({key:'',value:''})
    setArr([...arr])
    props?.onChange([...arr])
  }
  return <div className="w100 fl fc">
    
      {arr.map((e,i)=> <Space className="fl fr fac">
        <Input 
          key={'key'} 
          style={{marginBottom:5}} 
          defaultValue={e.key}
          onChange={(v)=>optionChange(i,'key',v)}
          placeholder="参数名"
        />
        <Input 
          key={'value'} 
          style={{marginBottom:5}} 
          defaultValue={e.value}
          onChange={(v)=>optionChange(i,'value',v)}
          placeholder="参数值"  
        />
        <MinusCircleOutlined rev key="del" onClick={()=>del(i)} style={{marginLeft:20,cursor:'pointer',}}/>
      </Space>)}
     
     <Button type="primary" onClick={add}>新增参数</Button>
  </div>
}

export default InputArray;