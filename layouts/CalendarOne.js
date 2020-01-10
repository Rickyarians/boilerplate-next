import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Typography, Button } from 'antd'
import { Fab } from 'react-tiny-fab'

import CustomToolbar from '../components/schedule/schedule_one/ToolBar'
import CustomEvent from '../components/schedule/schedule_one/EventBox'
import AddEvent from '../components/schedule/schedule_one/AddEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-tiny-fab/dist/styles.css'
import '../public/assets/styles/schedule.less'

export default ({ events, isAdmin, onView, onNavigate, onEventAdded, onEventEdited, onEventDeleted }) => {
  const [selectedSlot, setSelectedSlot] = useState({})
  const [isModalVisible, toggleModal] = useState(false)

  const localizer = momentLocalizer(moment)
  const { Title } = Typography

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

          {
            isAdmin ? (
              <Button
                onClick={() => toggleModal(true)}
                icon="plus-circle"
                className="create_new_btn"
              >
                Add Event
              </Button>
            ) : ''
          }

          {
            isAdmin ? (
              <div className="fab-button-schedule">
                <Fab
                  mainButtonStyles={{ backgroundColor: '#F7B731' }}
                  position={{ bottom: 0, right: 0 }}
                  icon="+"
                  alwaysShowTitle={true}
                  event={'click'}
                  onClick={() => toggleModal(true)}
                >
                  </Fab>
              </div>
            ) : ''
          }
        </div>

        <div>
          <Calendar
            onView={onView}
            onNavigate={onNavigate}
            titleAccessor="accessor"
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            style={{ height: 750 }}
            formats={{
              timeGutterFormat: 'HH:ss',
              dayFormat: 'dddd, D'
            }}
            components={{
              toolbar: CustomToolbar,
              event: ({ event }) => <CustomEvent isAdmin={isAdmin} event={event} onEdit={onEventEdited} onDelete={onEventDeleted} />
            }}
            selectable={isAdmin}
            onSelectSlot={(slotInfo) => {
              setSelectedSlot(slotInfo)
              toggleModal(true)
            }}
          />
        </div>
      </div>

      {
        isAdmin ? (
          <AddEvent visible={isModalVisible} slotInfo={selectedSlot} toggle={toggleModal} onSubmit={onEventAdded} />
        ) : ''
      }
    </div>
  )
}
