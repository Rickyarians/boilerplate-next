import { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, DatePicker, message } from 'antd'
import moment from 'moment'
const uuidv1 = require('uuid/v1');

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const AddEvent = ({ form, data = {}, visible, slotInfo, toggle, onSubmit, isModalVisible}) => {
  const { getFieldDecorator, validateFields } = form
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(data && data.start ? moment(data.start) : moment(slotInfo.start))
  const [endDate, setEndDate] = useState({})
  const [hoursDisabled, setHoursDisabled] = useState([])
  const [minutesDisabled, setMinutesDisabled] = useState([])
  const [secondsDisabled, setSecondsDisabled] = useState([])

  if (data && data.id) {
    getFieldDecorator('id', { initialValue: data.id })
  }

  const dateConfig = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }]
  }

  const titleConfig = {
    initialValue: data && data.title ? data.title : '',
    rules: [{ required: true, message: 'Please insert the title!' }]
  }

  const descriptionConfig = {
    initialValue: data && data.description ? data.description : ''
  }

  const changeStart = date => {
    const momentDate = moment(date)
    setStartDate(date)
    setEndDate(momentDate.add(30, 'minutes'))

    const hour = momentDate.format('HH')
    const minute = momentDate.format('mm')
    const second = momentDate.format('ss')

    setHoursDisabled(range(0, hour))
    setMinutesDisabled(range(0, minute))
    setSecondsDisabled(range(0, second))
  }

  const disabeldTime = _ => {
    const timeDisabeld = {
      disabledHours: () => hoursDisabled,
      disabledMinutes: () => minutesDisabled,
      disabledSeconds: () => secondsDisabled
    }

    return timeDisabeld
  }

  const _handleSubmit = _ => {
    setLoading(true)

    validateFields(async (err, values) => {
      if (!err) {
        if (typeof onSubmit == 'function') {
          for (const k in values) {
            if (typeof values[k] == 'object' && values[k] !== null) {
              values[k] = values[k].toDate()
            }
          }
          var id = uuidv1()
          values = {...values, id };
          const submited = await onSubmit(values)
          
          // if (submited && submited.status) {
          //   message[submited.status](submited.message)
          // }
          form.resetFields()
        }
        toggle(!visible)
      }
    })

    setLoading(false)
  }


  console.log(visible)
  return (
    <Modal
      visible={visible}
      title="Add New Event"
      onCancel={() => {
        toggle(!visible)
        form.resetFields()
      }}
      footer={[
        <Button key="back" onClick={() => toggle(!visible)}>
          Cancel
        </Button>,
        <Button key="submit" loading={loading} className="bg-purple" onClick={_handleSubmit}>
          <span className="text-white">Submit</span>
        </Button>,
      ]}
    >
      <Form action="#" layout="horizontal" onSubmit={_handleSubmit}>
        <Form.Item label="Event Title">
          {getFieldDecorator('title', titleConfig)(
            <Input autoFocus={true} placeholder="Insert title here" />,
          )}
        </Form.Item>

        <Form.Item label="Time Start">
          {getFieldDecorator('start', {
            initialValue: data && data.start ? moment(data.start) : moment(slotInfo.start),
            ...dateConfig
          })(
            <DatePicker 
              showTime 
              className="w-100" 
              format="YYYY-MM-DD HH:mm:ss" 
              onChange={date => changeStart(date)}
              disabledDate={current => {return current && current < moment().endOf('day').subtract(1, 'day')}}
            />,
          )}
        </Form.Item>

        <Form.Item label="Time End">
          {getFieldDecorator('end', {
            initialValue: endDate && endDate._isAMomentObject ? endDate : data && data.end ? moment(data.end) : moment(slotInfo.end),
            ...dateConfig
          })(
            <DatePicker 
              showTime 
              className="w-100" 
              format="YYYY-MM-DD HH:mm:ss" 
              // disabledTime={disabeldTime}
              disabledDate={current => {return current && current < moment(startDate).endOf('day').subtract(1, 'day')}}
            />,
          )}
        </Form.Item>

        <Form.Item label="Event Description">
          {getFieldDecorator('description', descriptionConfig)(
            <Input.TextArea rows={5} placeholder="Event description" />,
          )}
        </Form.Item>

        <button type="submit" className="d-none"></button>
      </Form>
    </Modal>
  )
}

export default Form.create({ name: 'AddEvent' })(AddEvent)
