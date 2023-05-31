import { useEffect,useState,useContext, useMemo } from "react";
import {Form, Input, Button,Divider, Typography } from 'antd'
import InputArray from './InputArray'
import globalContext from '../../store/index'
import { postx } from "./../../utils";
export default function Login(props) {
  const globalContextEntity = useContext(globalContext)
  const [formRef] = Form.useForm();
  useEffect(()=>{   
    console.log('login loaded')
    refreshConfigInfo()
  },[])

  const refreshConfigInfo = async ()=>{
    const configInfo = await globalContextEntity.postMessage('getStorage','configInfo')
    if(configInfo) {
      configInfo.data = configInfo.data ? json2arr(configInfo.data) : []
      configInfo.headers = configInfo.headers ? json2arr(configInfo.headers) : []
      configInfo.pullData = configInfo.pullData ? json2arr(configInfo.pullData) : []
      configInfo.insertData = configInfo.insertData ? json2arr(configInfo.insertData) : []
      formRef.setFieldsValue({
        ...configInfo
      })
    }
  }

  const submit = async ()=>{
    const configInfo = await formRef.validateFields()
    configInfo.data = arr2json(configInfo.data)
    configInfo.headers = arr2json(configInfo.headers)
    configInfo.pullData = arr2json(configInfo.pullData)
    configInfo.insertData = arr2json(configInfo.insertData)
    await globalContextEntity.postMessage('setStorage',{key:'configInfo', value:configInfo})
    props?.returnNote && props.returnNote()
  }

  const arr2json = (arr)=>{
    let data = {}
    if(arr?.length >0) {
      arr.forEach(item=>{
        data[item.key] = item.value
      })
    }
    return data
  }

  const json2arr = (json)=>{
    let arr = []
    for(let i in json){
      arr.push({
        key:i,
        value:json[i]
      })
    }
    return arr
  }

  return <div className="w100 fl fc">
    <Form form={formRef} labelAlign="left" size="small" layout="vertical">
      <Typography>全局配置</Typography>
      <Form.Item name="url" label="额外推送URL">
        <Input placeholder="请输入推送地址"/>
      </Form.Item>
      <Form.Item name="data" label="额外data参数">
        <InputArray />
      </Form.Item>
      <Form.Item name="headers" label="额外header参数">
        <InputArray />
      </Form.Item>
      <Form.Item name="pullData" label="拉取列表参数">
        <InputArray />
      </Form.Item>
      <Form.Item name="insertData" label="注入记录参数">
        <InputArray />
      </Form.Item>
     <Button type="primary" onClick={submit}>确认配置</Button>
    </Form>
  </div>
}