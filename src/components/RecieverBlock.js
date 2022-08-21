import React from 'react'

const RecieverBlock = ({name, avatar}) => {
  return (
    <div>
        <h3>{name}</h3>
        <img src={avatar}/>
    </div>
  )
}

export default RecieverBlock