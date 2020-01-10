import { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { message } from 'antd'

import CheckIn from '../../layouts/ListOne'
import '../../public/assets/styles/list_one.less'

const ListOne = ({}) => {
  
  const [list, setlist] = useState([]) 


const insertdata = async (data) => {  
    const newarray =[...list, data]

    await setlist(newarray)
}
 

  
 
  return (
    <div id="fade-in">
      <CheckIn
        data={list}
        insertdata={insertdata}
        // {...props}
      />
    </div>
  )
}


export default ListOne
