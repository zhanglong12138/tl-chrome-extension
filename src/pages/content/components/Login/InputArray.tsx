import { useState, useEffect, useMemo } from 'react'
import {Form, Input, Button,Row} from 'antd'
// import {Popconfirm, Select,Radio,Checkbox,Modal,message, Divider,Row, Space} from 'antd'
import {MinusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
export default function Login(props) {
  useEffect(() => {
    console.log("tl-chrome-extension content script login loaded");
  }, []);

  const formExtraObj = { labelCol : { span: 4 }, wrapperCol : { span: 16 }}

  return <div className="w100 fl fc">
    <Form {...formExtraObj} >
      <Form.Item name="url" label="额外推送URL">
        <Input placeholder="请输入推送地址"/>
        {/* <InputArray /> */}
      </Form.Item>
      <Form.Item name="data" label="额外data参数">
        <Input placeholder="请输入推送地址"/>
      </Form.Item>
      <Form.Item name="header" label="额外header参数">
        <Input placeholder="请输入推送地址"/>
      </Form.Item>
    </Form>
  </div>
}

const InputArray = ({value,onChange})=>{
  const [arr,setArr] = useState(value)
  useEffect(() => {
    setArr(value)
  }, [value]);
  const optionChange = (i,v)=>{
    arr[i].value = v
    setArr([...arr])
    onChange([...arr])
  }
  const del = (i)=>{
    arr.splice(i,1)
    setArr([...arr])
    onChange([...arr])
  }
  const add = ()=>{
    arr.push({value:''})
    setArr([...arr])
    onChange([...arr])
  }
  return <div className="w100 fl fc">
    <div>
          {arr.map((e,i)=> <Row>
            <Input 
              key={'key'} 
              style={{marginBottom:5}} 
              defaultValue={e.value}
              onChange={(v)=>optionChange(i,v)}
              placeholder="参数名"
            />
            <Input 
              key={'value'} 
              style={{marginBottom:5}} 
              defaultValue={e.value}
              onChange={(v)=>optionChange(i,v)}
              placeholder="参数值"  
            />
            <MinusCircleOutlined rev key="del" onClick={()=>del(i)} style={{marginLeft:20,cursor:'pointer',}}/>
          </Row>)}
     </div>
     <Button onClick={add}>新增参数</Button>
  </div>
}