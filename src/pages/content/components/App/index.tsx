import { useState, useEffect } from 'react'
import logo from '@assets/img/logo.png'
import Login from '../Login'
// import Note from '../Note'
import {getIStorageSync,setIStorageSync} from '../utils.js'

function App() {
  const [modalShow, setModalShow] = useState(false)
  const [modalShowAlways, setModalShowAlways] = useState(true)
  const onMouseOver = () => {
    if (modalShow) return
    setModalShow(true)
  }
  const onMouseLeave = () => {
    if (!modalShow) return
    setModalShow(false)
  }
  const [loginInfo, setLoginInfo]  = useState(false)

  useEffect(() => {
    console.log(chrome.storage)
    getIStorageSync('loginInfo').then((res) => {
      console.log(res)
      setLoginInfo(res)
    })
  },[])


  return (
    <div className="tl-helper-chrome-extension-frame">
      <div className="tip" onClick={onMouseOver}>
        T
      </div>
      <div className={`tl-container ${(modalShowAlways || modalShow) ? 'modalShow' : ''}`} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        <div className="tl-header fl fr blueColor" >
          <div className="header-title f1">xx hepler</div>
          <div className="header-close-icon" onClick={() => setModalShowAlways(false)}>×</div>
        </div>
       { !loginInfo && <Login setModalShowAlways={setModalShowAlways}/>}
       {/* { loginInfo && <Note />} */}
      </div>
    </div>
  )
}

export default App
