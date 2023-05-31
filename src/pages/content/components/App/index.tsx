import { useState, useEffect, useMemo,useContext } from 'react'
import logo from '@assets/img/logo.png'
import Login from '../Login'
import Note from '../Note'
import type { MenuProps } from 'antd';
import { Dropdown, Space, Modal} from 'antd';
import {UnorderedListOutlined,ExclamationCircleOutlined,CloseOutlined } from '@ant-design/icons'
import globalContext from '../../store/index'

function App(props) {
  const globalContextEntity = useContext(globalContext)
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
        // await props?.postMessage('removeStorage', 'loginInfo')
        setLoginInfo(false)
      },
    })
  }
  const [panelType, setPanelType] = useState<'setting' | 'note' | 'help'>('setting')
  const openSettingPanel = ()=>{
    setPanelType('setting')
  }

  const openHelp = ()=>{
    setPanelType('help')
  }

  const returnNote = ()=>{
    setPanelType('note')
  }
  const [loginInfo, setLoginInfo]  = useState<Boolean | Object>(false)
  const items: MenuProps['items'] = useMemo(()=>{
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
      // {
      //   key: 'logout',
      //   label: <a onClick={logout}>退出</a>,
      //   disabled: !Boolean(loginInfo),
      // },
    ]
  },[loginInfo])

  useEffect(() => {
    initApp();
  },[])

  const initApp = async () => {
    const loginInfo = await globalContextEntity.postMessage('getStorage', 'loginInfo')
    setLoginInfo(loginInfo)
  }


  return (
    <div className="tl-helper-chrome-extension-frame">
      <div className="tl-tip" onClick={onMouseOver}>T</div>
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
          { panelType=='setting' && <Login returnNote={returnNote} />}
          { panelType=='note' && <Note />}
          { panelType=='help' && <Note />}
        </div>
      </div>
    </div>
  )
}

export default App