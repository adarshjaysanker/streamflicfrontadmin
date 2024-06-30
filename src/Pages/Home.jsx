import React from 'react'
import './home.css'
import { useSidebar } from '../useContext/SidebarContext'

function Home() {

  const {isOpen} = useSidebar();

  return (
    <div className={`home ${isOpen ? 'sidebar-open' : ''}`}>
      <h1>Welcome to Admin Space</h1>
    </div>
  )
}

export default Home