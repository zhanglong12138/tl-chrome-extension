import { useState, useEffect, useMemo,useContext, useRef } from 'react'
import logo from '@assets/img/logo.png'
import type { MenuProps } from 'antd';
import { Dropdown, Space, Modal} from 'antd';
import {UnorderedListOutlined,ExclamationCircleOutlined,CloseOutlined } from '@ant-design/icons'

import Login from '../Login'
import Note from '../Note'
import Help from '../Help';
import globalContext from '../../store/index'

function App(props) {
  const globalContextEntity = useContext(globalContext)
  //快捷操作
  useEffect(() => {
    console.log("NOTE loaded");
    window.addEventListener('keydown', handleKeyDown);
  }, []);
  const noteRef = useRef(null)
  const handleKeyDown = (e)=>{
    //Ctrl+Q 或 Ctrl + I 新增操作
    if((e.ctrlKey && e.keyCode==81) || (e.ctrlKey && e.keyCode==73)){
      setModalShowAlways(true)
      setPanelType('note')
      noteRef.current.search()
    }
    //Ctrl+Shift+F 或 Ctrl+Alt+Q 查询操作
    if((e.ctrlKey && e.shiftKey && e.keyCode==70) || (e.ctrlKey && e.altKey && e.keyCode==81)){
      setModalShowAlways(true)
      setPanelType('note')
      noteRef.current.editRedictly()
    }
  }
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

  //panel显示逻辑
  const [panelType, setPanelType] = useState<'setting' | 'note' | 'help'>('note')
  const openSettingPanel = ()=>{
    setPanelType('setting')
  }

  const openHelp = ()=>{
    setPanelType('help')
  }

  const returnNote = ()=>{
    setPanelType('note')
  }
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
      {
        key: 'note',
        label: <a onClick={returnNote}>返回</a>,
        disabled: panelType === 'note',
      },
    ]
  },[panelType])

  return (
    <div className="tl-helper-chrome-extension-frame">
      <div className="tl-tip" onClick={onMouseOver}>T</div>
      <div className="tiplevel" onMouseOver={onMouseOver} onClick={onMouseOver}></div>
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
          { panelType=='note' && <Note ref={ref=>noteRef.current = ref}/>}
          { panelType=='help' && <Help returnNote={returnNote} />}
        </div>
      </div>
    </div>
  )
}

export default App