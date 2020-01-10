import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'


import Calendar from '../../layouts/CalendarOne'


const Schedule = ( {}) => {
  const [events, setEvents] = useState([])
  const [date, setDate] = useState(Date.now())
  const [viewMode, setViewMode] = useState('week')


  const mapEvents = (events) => {
    events.map(item => {
      for (const k in item) {
        if (k == 'start' || k == 'end') {
          item[k] = new Date(item[k])
        }
      }
    })

    setEvents(events)
  }

  const loadEvent = (date = Date.now(), viewMode = 'week') => {
    const start = moment(date).startOf(viewMode).startOf('day').toISOString()
    const end = moment(date).endOf(viewMode).startOf('day').toISOString()

  }


  const onEventAdded = async (variables) => {
    // console.log(variables)

    const data = events.findIndex((obj => obj.start >= variables.start && obj.end <= variables.end))
    if(data == -1) {
      const newarray =[...events, variables]
      await setEvents(newarray)
      loadEvent(date, viewMode)
    } else {
      alert('nggak bisa malih')
    }
    
  }

  const onEventEdited = async (variables) => {
    const arrnew = events
    const data = events.findIndex((obj => obj.id == variables.id))
    arrnew.splice(data, 1, variables)
    setEvents(arrnew)
    loadEvent(date, viewMode)
  }

  const onEventDeleted = async (variables) => {
    console.log(variables)

    const arr = events.filter(function(el){
      return el.id !== variables.id;
    });

    setEvents(arr)

    loadEvent(date, viewMode)
  }

  const onNavigate = newDate => {
    setDate(new Date(newDate))
    loadEvent(new Date(newDate), viewMode)
  }

  const onView = view => {
    setViewMode(view)
    loadEvent(date, view)
  }

  const propsData = [{}, {
    events: events,
    onView: onView,
    onNavigate: onNavigate,
    onEventAdded: onEventAdded,
    onEventEdited: onEventEdited,
    onEventDeleted: onEventDeleted,
  }]

    
    return (
      <Fragment>
        <div id="fade-in">
          <Calendar {...propsData[1]} />
        </div>
      </Fragment>
    )
  
}



export default Schedule
