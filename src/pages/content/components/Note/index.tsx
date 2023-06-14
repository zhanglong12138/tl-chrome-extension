import { useEffect, useState, useContext,useMemo,forwardRef ,useImperativeHandle,useRef} from "react";
import {Form, Input, Button,Divider, Typography, Card, Tag, Space,message } from 'antd'

import globalContext from '../../store/index'
import { set } from "mobx";
const  Note = (props,ref)=> {
  //外接方法
  useImperativeHandle(ref, () => ({
    search(){
      setEditStatus(false)
      setTimeout(()=>{
        searchRef.current?.focus()
      },300)
    },
    editRedictly(){
      setEditStatus(true)
      setTimeout(()=>{
        editRef.current?.focus()
      },300)
    }
  }));
  const searchRef = useRef(null)
  const editRef = useRef(null)
  const globalContextEntity = useContext(globalContext)
  const [formRef] = Form.useForm();
  const [data, setData] = useState([])
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      fetchData()
    }
  };
  const [configInfo,setConfigInfo] = useState<boolean | any>(false)
  useEffect(()=>{
    refreshConfigInfo()
  },[])
  const refreshConfigInfo = async ()=>{
    const configInfo = await globalContextEntity.postMessage('getStorage','configInfo')
    setConfigInfo(configInfo)
  }
  const fetchData = async ()=>{
    const formData = await formRef.validateFields()
    let data = {
      ...configInfo.data,
      ...configInfo.pullData,
      page:1,
      count:30,
      cate:0
    }
    if(!formData.keywords){
      return;
    }else{
      data.keywords = formData.keywords
    }
    const res = await globalContextEntity.postx({
      url: configInfo.url,
      data
    })
    setData(res?.data?.list)
  }

  //新增记录
  const [editFormRef] = Form.useForm();
  const [editStatus, setEditStatus] = useState(false)
  const onInput = (e)=>{
    console.log(e)
    if(e.ctrlKey && e.keyCode==13){
      handleInsertEvent()
    }
  }
  const handleInsertEvent = async ()=>{
    const formData = await editFormRef.validateFields()
    const res = await globalContextEntity.postx({
      url: configInfo.url,
      data:{
        ...configInfo.data,
        ...configInfo.insertData,
        ...formData
      }
    })
    if(res?.status==1){
      message.success('提交成功')
      editFormRef.resetFields()
      setEditStatus(false)
      props?.setModalShowAlways && props.setModalShowAlways(false)
    }else{
      message.error(res?.message || '操作失败')
    }
  }


  return <div className="note-card w100 fl fc">
    
    {editStatus && <div className="component-edit">
        <Form form={editFormRef} labelAlign="left" size="middle" layout="vertical">
          <Form.Item name="key">
            <Input ref={editRef} placeholder="记录项"/>
          </Form.Item>
          <Form.Item name="value">
            <Input.TextArea placeholder="记录值" onKeyDown={onInput} style={{minHeight:180}}/>
          </Form.Item>
          <Space>
            <Button type="primary" key="submit" onClick={handleInsertEvent}>提交</Button>
            <Button type="primary" key="submit" onClick={()=>setEditStatus(false)}>取消</Button>
          </Space>
        </Form>
      </div>}
      {!editStatus && <>
        <Form form={formRef} labelAlign="left" size="middle" layout="inline">
          <Form.Item name="keywords">
            <Input ref={searchRef} placeholder="请输入关键词" onPressEnter={handleEnter}/>
          </Form.Item>
          
          <Space>
            <Button type="primary" key="search" onClick={fetchData}>搜索</Button>
            <Button type="primary" key="insert" onClick={()=>setEditStatus(true)}>新增</Button>
          </Space>
        </Form>
        <div className="tl-component-content noScroll">
        {
          data?.length>0 && data.map(e=>{
            if(e.contentType=='art'){
              return <Card size="small" style={{
                boxShadow:'0 0 10px #eee',
                marginBottom:'20px',
                borderRadius:0
              }}>
                <a href={"http://blog.zxlucky.com/art?id="+e.id} target="_blank">
                  <Typography.Text strong style={{whiteSpace:'pre-wrap'}}>{e.name}</Typography.Text>
                </a>
                <div className="fl fr" style={{margin:'8px 0'}}>
                  <div><Tag>文章</Tag></div>
                  <i className="tl-time-tag">{e.ctime}</i>
                </div>
                
              </Card>
            }
            if(e.contentType=='note'){
              return <Card size="small" style={{
                  boxShadow:'0 0 10px #eee',
                  marginBottom:'20px',
                  borderRadius:0
                }}
              >
                <Typography.Text strong>{e.key}</Typography.Text>
                <div className="fl fr" style={{margin:'8px 0'}}>
                  <div><Tag>杂项</Tag></div>
                  <i className="tl-time-tag">{e.ctime}</i>
                </div>
                <Typography style={{fontSize:'10px',padding:'0 3px'}}>{e.value}</Typography>
              </Card>
            }
          })
        }
        </div>
      </>}
  </div>
}

export default forwardRef(Note)
