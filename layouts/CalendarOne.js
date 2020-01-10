import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Typography, Button } from 'antd'


import CustomToolbar from '../components/schedule/schedule_one/ToolBar'
import CustomEvent from '../components/schedule/schedule_one/EventBox'
import AddEvent from '../components/schedule/schedule_one/AddEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../public/assets/styles/schedule.less'

export default ({ events, onView, onNavigate, onEventAdded, onEventEdited, onEventDeleted }) => {
  const [selectedSlot, setSelectedSlot] = useState({})
  const [isModalVisible, toggleModal] = useState(false)

  const localizer = momentLocalizer(moment)
  const { Title } = Typography


  console.log(events)
  return (
    <div className="bg-default mobile-calendar">
      <div className="container py-3 schedule">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          className="mb-2"
        >
          <div className="title-schelude-mobile">
            <Title className="" level={2}>Schedule</Title>
          </div>

        
              <Button
                onClick={() => toggleModal(true)}
                icon="plus-circle"
                className="create_new_btn"
              >
                Add Event
              </Button>
        

        
        </div>

        <div>
          <Calendar
            onView={onView}
            onNavigate={onNavigate}
            titleAccessor="accessor"
            localizer={localizer}
            events={events}
          
            defaultView="week"
            style={{ height: 750 }}
            formats={{
              timeGutterFormat: 'HH:ss',
              dayFormat: 'dddd, D'
            }}
            components={{
              toolbar: CustomToolbar,
              event: ({ event }) => <CustomEvent event={event} onEdit={onEventEdited} onDelete={onEventDeleted} />
            }}
            selectable={true}
            onSelectSlot={(slotInfo) => {
              setSelectedSlot(slotInfo)
              toggleModal(true)
              console.log(slotInfo)
            }}
          
          />
        </div>
      </div>

   
          <AddEvent visible={isModalVisible} slotInfo={selectedSlot} toggle={toggleModal} onSubmit={onEventAdded} />
       
    </div>
  )
}
