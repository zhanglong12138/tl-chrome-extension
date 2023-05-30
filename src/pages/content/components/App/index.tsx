import { useState, useEffect, useMemo } from 'react'
import logo from '@assets/img/logo.png'
import Login from '../Login'
import Note from '../Note'
import type { MenuProps } from 'antd';
import { Dropdown, Space, Modal} from 'antd';
// import {observer} from 'mobx-react';
import {UnorderedListOutlined,ExclamationCircleOutlined,CloseOutlined } from '@ant-design/icons'


function App(props) {

  //modal显示逻辑
  const [modalShow, setModalShow] = useState(false)
  const [modalShowAlways, setModalShowAlways] = useState(false)
  const onMouseOver = () => {
    if (modalShow) return
    setModalShow(true)
  }
  const onMouseLeave = () => {
    if (!modalShow) return
    setModalShow(false)
  }

  const closeModal = (e) => {
    e.stopPropagation();
    setModalShowAlways(false)
    setModalShow(false)
  }

  //用户信息部分
  const logout = async () => {
    Modal.confirm({
      title: '确认退出？',
      icon: <ExclamationCircleOutlined rev/>,
      content: '退出后将无法接收到推送消息',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await props?.postMessage('removeStorage', 'loginInfo')
        setLoginInfo(false)
      },
    })
  }

  const openSettingPanel = ()=>{
    
  }

  const openHelp = ()=>{
    
  }
  const [loginInfo, setLoginInfo]  = useState<Boolean | Object>(false)
  const items: MenuProps['items'] = useMemo(()=>{
    console.log('loginInfo', Boolean(loginInfo), loginInfo)
    return [
      {
        key: 'settings',
        label: <a onClick={openSettingPanel}>设置</a>,
      },
      {
        key: 'help',
        label: <a onClick={openHelp}>帮助</a>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: <a onClick={logout}>退出</a>,
        disabled: !Boolean(loginInfo),
      },
    ]
  },[loginInfo])

  useEffect(() => {
    initApp();
  },[])

  const initApp = async () => {
    const loginInfo = await props?.postMessage('getStorage', 'loginInfo')
    setLoginInfo(loginInfo)
  }


  return (
    <div className="tl-helper-chrome-extension-frame">
      <div className="tip" onClick={onMouseOver}>T</div>
      <div className="tiplevel" onMouseOver={onMouseOver} ></div>
      <div className={`tl-container ${(modalShowAlways || modalShow) ? 'tl-modalShow' : ''}`} onMouseLeave={onMouseLeave} onClick={() => setModalShowAlways(true)}>
        <div className="tl-header fl fr blueColor w100" >
          <div className='header-menu-icon'>
            <Dropdown menu={{ items}}>
              <UnorderedListOutlined rev />
            </Dropdown>
          </div>
          <div className="header-title flex1">陶路助手</div>
          <div className="header-close-icon fl fac fjc"  onClick={closeModal}><CloseOutlined rev /></div>
        </div>
        <div className='component-body w100' >
          { !loginInfo && <Login />}
          { loginInfo && <Note />}
        </div>
      </div>
    </div>
  )
}

export default App