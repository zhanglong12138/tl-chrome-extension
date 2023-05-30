import { useEffect } from "react";
import {Form, Input, Button} from 'antd'
// import {Popconfirm, Select,Radio,Checkbox,Modal,message, Divider,Row, Space} from 'antd'
import {MinusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
export default function Login(props) {
  useEffect(() => {
    console.log("tl-chrome-extension content script login loaded");
  }, []);

  const formExtraObj = { labelCol : { span: 8 }, wrapperCol : { span: 12 }}

  return <div className="w100 fl fc">
    <Form {...formExtraObj} >
      <Form.Item name="url" label="额外推送URL">
        <Input placeholder="请输入推送地址"/>
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
