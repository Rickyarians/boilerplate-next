import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'


import Calendar from '../../layouts/CalendarOne'


const Schedule = ( {}) => {
  const router = useRouter()

  const [role, setRole] = useState('member')
  const [events, setEvents] = useState([])
  const [space, setSpace] = useState('')
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

    // eventRefetch({
    //   query: { spaceId: spaceId },
    //   where: {
    //     "start_gte": start,
    //     "start_lte": end
    //   }
    // })
    //   .then(({ data }) => mapEvents(data.events))
  }

  

  

  const onEventAdded = async (variables) => {
    variables = { ...variables, spaceId: spaceId }
    const eventAdded = await addEvent({
      variables,
      update: () => {
        loadEvent(date, viewMode)
      }
    })

    if (eventAdded) {
      return {}
    } else {
      return {
        status: 'error',
        message: 'Event added failed!'
      }
    }
  }

  const onEventEdited = async (variables) => {
    const eventEdited = await editEvent({
      variables,
      update: () => {
        loadEvent(date, viewMode)
      }
    })

    if (eventEdited) {
      return {}
    } else {
      return {
        status: 'error',
        message: 'Event updated failed!'
      }
    }
  }

  const onEventDeleted = async (variables) => {
    const eventDeleted = await deleteEvent({
      variables,
      update: () => {
        loadEvent(date, viewMode)
      }
    })

    if (eventDeleted) {
      return {}
    } else {
      return {
        status: 'error',
        message: 'Event deleted failed!'
      }
    }
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
    isAdmin: role === 'admin',
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
