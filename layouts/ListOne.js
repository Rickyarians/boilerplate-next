import ChatInputText from "./../components/textinput/InputTextList"
import { Avatar, Divider } from "antd"
import moment from "moment"
import { useState, useEffect } from 'react'
import CardList from './../components/card/card'

export default ({
  data,
  insertdata
}) => {

  useEffect(() => {
   
  }, [data])

  const ListItem = () => {
    let item = []

    for (let i = 1; i <= data.length; i++) {

      if(i % 3 == 0) {
        item.push(
          <CardList text={data[i-1]} bgcolor="red"/>
        )
      } else {
        item.push(
          <CardList text={data[i-1]} bgcolor="black"/>
        )
      }
     
    }
    return item
  }

  console.log(data)
  return (
    <div className="pt-5">
      <div className="container pt-3">
       
        <div className="container-fluid bg-default p-3">
          <div className="d-flex w-100 justify-content-space-between">
          </div>
          <h4>Simple List</h4>
          <div className="d-flex align-item-center">
            <ChatInputText
              defaultValue=" "
              autoFocus={true}
              style={{ marginLeft: "10px"}}
              onPressEnter={(e, data) => {
                if (e.target.value.trim() !== '') {
                  // alert(e.target.value)
                  insertdata(e.target.value)
                  e.target.value = ""
                } else {
                  alert('tidak boleh kosong')
                }
                e.preventDefault()
              }}
              onClickSend={(e, data) => {
                if (e.text.trim() !== '') {
                  // alert(e.text)
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
      
      {
        data ?
        ListItem()
        :
        ''
      }
      
      </div>
    </div>
  )
}
