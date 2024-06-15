import { Typography } from '@mui/material'
import React from 'react'
// import "../Home/home.css"
import {Link} from "react-router-dom"
function USer({userId,name,avatar}) {
  return (
<>
<Link to={`/user/${userId}`} className='homeUser'>
<img src={avatar} alt={name} />
      <Typography>{name}</Typography>
</Link> 


</>
  )
}

export default USer
