import ChatInputText from "./../components/textinput/InputTextList"
import { Avatar, Divider } from "antd"
import moment from "moment"
import { useState, useEffect } from 'react'

export default ({
  data,
  insertdata
}) => {

  useEffect(() => {
   
  }, [data])

  console.log(data)
  return (
    <div className="pt-5">
      <div className="container pt-3">
       
        <div className="container-fluid bg-default p-3">
          <div className="d-flex w-100 justify-content-space-between">
            <span className="description">
              List.
            </span>
          
          </div>
          <h4>Answer</h4>
          <div className="d-flex align-item-center">
            <ChatInputText
              defaultValue=" "
              autoFocus={true}
              style={{ marginLeft: "10px"}}
              onPressEnter={(e, data) => {
                if (e.target.value.trim() !== '') {
                  // onSendComment({
                  //   user: user,
                  //   comment: e.target.value,
                  //   ...data
                  // })
                  alert(e.target.value)
                  insertdata(e.target.value)
                  e.target.value = ""
                } else {
                  alert('tidak boleh kosong')
                }
                e.preventDefault()
              }}
              onClickSend={(e, data) => {
                if (e.text.trim() !== '') {
                  alert(e.text)
                  insertdata(e.text)
                  e.text = ""
                } else {
                  alert('tidak boleh kosong')
                }
              }}
              upload={false}
            />
          </div>
        
        </div>
      </div>
    </div>
  )
}
