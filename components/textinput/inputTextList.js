import { useState, createRef } from 'react'
// import './../../public/assets/styles/socmedOne.less'
import { Icon, Input, Upload, Modal, Button } from 'antd'
import { sendButton } from '../../public/icons/chat'

export default ({
  style,
  value,
  autoFocus = true,
  onChange = () => null,
  placeholder = "type your message here",
  onPressEnter = () => null,
  id = null,
  onClickSend = () => null,
  defaultValue = null,
  upload = true
}) => {

  const textInput = createRef()



  const [inputValue, setinputValue] = useState('')



  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={{ display: 'block' }}>
        {
          value ?
            <Input.TextArea
              autoFocus={autoFocus}
              placeholder={placeholder}
              onKeyPress={e => {
                (e.key == "Enter" && !e.shiftKey) ? onPressEnter(e, { text: textInput.current.textAreaRef.value }) : null
              }}
              onChange={e => setinputValue(e.target.value)}
              style={styles.input}
              autoSize={true}
              value={value}
              ref={textInput}
              defaultValue={defaultValue}
            /> :
            <Input.TextArea
              autoFocus={autoFocus}
              id={id}
              placeholder={placeholder}
              onKeyPress={e => {
                if (e.key == "Enter" && !e.shiftKey) {
                  onPressEnter(e, { text: textInput.current.textAreaRef.value })
                  //     setattachments({ fileList: [] })
                  //     setimages({ ...images, fileList: [] })
                }
              }}
              onChange={e => setinputValue(e.target.value)}
              style={styles.input}
              autoSize={true}
              ref={textInput}
              defaultValue={defaultValue}
            />
        }

       
    </div>

      <div onClick={() => {
          onClickSend({ text: textInput.current.textAreaRef.value, })
          textInput.current.textAreaRef.value = ''
        }} style={{marginTop: '10px', textAlign: 'center', display: 'block', width: '100%', cursor: 'pointer', padding: '1% 1%', color: 'white', backgroundColor: '#2ecc71'}}>
          Insert      
      </div>
       
    </div>
    

  )
}


const styles = {

  container: {
    backgroundColor: '#F4F7FC',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingLeft: '10px'
  },

  input: {
    width: '100%',
    backgroundColor: 'white',
    border: '0px',
    outline: '0px',
    resize: 'none',
    padding: '5px',
    boxShadow: 'none',
    overflow: 'auto !important',
    minHeight: '100px'
  },

  suffix: {
    fontSize: '1.5em',
    display: 'flex !important',
    pointer: 'cursor'
  }
}
