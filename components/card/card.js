import { useState, createRef } from 'react'

export default ({
  text,
  bgcolor
}) => {




  return (
    <React.Fragment>
      <div style={{
        display: 'block',
        width: '100%',
        padding: '2%',
        color: '#fff',  
        backgroundColor: bgcolor,
        marginTop: '5px'
      }}>
        {text}
      </div>
    </React.Fragment>
  )
}


