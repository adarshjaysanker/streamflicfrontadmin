import React, { useContext, useState } from 'react';
import './sidebar.css'
import { Link } from 'react-router-dom';
import { useSidebar } from '../../useContext/SidebarContext';

function Sidebar() {

 const {isOpen, toggleSidebar} = useSidebar();

 const handleLinkClick = () => {
  if(isOpen){
    toggleSidebar();
  }
 }

  return (
    <>
      <button className='toggle-button' onClick={toggleSidebar}>
        {isOpen ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-bars"></i>}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
            <li onClick={handleLinkClick}><Link to='/'>Home</Link></li>
            <li onClick={handleLinkClick}><Link to='/explore'>Explore</Link></li>
            <li onClick={handleLinkClick}><Link to='/movies'>Movies</Link></li>
            <li onClick={handleLinkClick}><Link to='/tvshows'>TV Shows</Link></li>
            <li onClick={handleLinkClick}><Link to='/users'>Users</Link></li>         
        </ul>
    </div>
   
    </>
  )
}

export default Sidebar