import React, { useState } from 'react'

import "./header.css"
import { useSelector } from 'react-redux'
import {Link}  from "react-router-dom"
import {
    Home,HomeOutlined,Add,AddOutlined,SearchOutlined,Search,AccountCircle,AccountCircleOutlined

} from "@mui/icons-material"
import { Avatar } from '@mui/material'
function Header() {
  const { user } = useSelector((state) => state.user);
  const [tab,setTab]=useState(window.location.pathname)

  return (
    <div className='header'>
      <Link to="/" onClick={()=>setTab("/")}>
      {
        tab==="/" ?<Home style={{color:'black'}}></Home>:<HomeOutlined/>
      }
      </Link>


      <Link to="/newpost"  onClick={()=>setTab("/newpost")}> 
      {
        tab==="/newpost" ?<Add style={{color:'black'}}></Add>:<AddOutlined/>
      }
  
     
      </Link>


      <Link to="/search"  onClick={()=>setTab("/search")}>
      {
        tab==="/search" ?<Search style={{color:'black'}}></Search>:<SearchOutlined/>
      }
  
      </Link>


      <Link to="/profile"  onClick={()=>setTab("/profile")}>
      {
        tab==="/profile" ?         <Avatar  className='avatar'
        src={user.avatar.url}
   
    />: <Avatar  className='avatar'
    src={user.avatar.url}   />
      }  
      </Link>


    </div>
  )
}

export default Header

