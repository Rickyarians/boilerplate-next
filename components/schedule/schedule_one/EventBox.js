import { useState, useEffect, Fragment } from 'react'
import { Button, Modal, Icon, message } from 'antd'
import moment from 'moment'

import EditEvent from './AddEvent'

export default ({ isAdmin, event, onEdit, onDelete }) => {
  const [isOpen, setOpen] = useState(false)
  const [isEdited, setEdited] = useState(false)
  const [bgColor, setBg] = useState('')

  function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  const randomColor = () => {
    const hex = intToRGB(hashCode(event.id))
    return `#${hex}`
  }

  useEffect(() => {
    setBg(randomColor())
  }, [])

  const { confirm } = Modal

  const modalConfirm = _ => {
    confirm({
      title: 'Do you want to delete this items?',
      content: 'Your action cannot be undo',
      onOk() {
        onDelete(event)
      },
      onCancel() { },
    })
  }

  return (
    <Fragment>
      <Button block={true} className={`border-0 text-white text-left px-2`} style={{ backgroundColor: bgColor, height: '100%' }} onClick={_ => setOpen(true)}>
        <span className="text-bold d-block">{event.title}</span>
        <span>{moment(event.start).format('HH:mm')} - </span>
        <span> {moment(event.end).format('HH:mm')}</span>
      </Button>

      <Modal
        visible={isOpen}
        onCancel={_ => setOpen(false)}
        footer={[
          <Fragment>
            <Fragment>
              <Icon type="edit" className="px-2" style={{ color: "#2d98da", fontSize: 20 }} onClick={_ => setEdited(true)} /> &nbsp;
                  <Icon type="delete" className="px-2" style={{ color: "#eb3b5a", fontSize: 20 }} onClick={_ => modalConfirm()} /> &nbsp;
                </Fragment>
            <Button type="primary" onClick={_ => setOpen(false)}>Close</Button>
          </Fragment>
        ]}
        className="p-3"
        closable={false}
      >
        <div className="d-inline-block w-100">
          <div>  
            <span>{moment(event.start).format('dddd, HH:mm')} - </span>
            <span > {moment(event.end).format('dddd, HH:mm')}</span>
          </div>
          <h3>{event.title}</h3>

        </div>
        <div className="d-block">
          <p>{event.description}</p>
        </div>
      </Modal>

      <EditEvent
        visible={isEdited}
        data={event}
        toggle={setEdited}
        onSubmit={onEdit}
      />
    </Fragment>
  )
}
