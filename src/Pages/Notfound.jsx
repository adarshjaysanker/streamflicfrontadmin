import React from 'react'
import { Link } from 'react-router-dom'
import './notfound.css'

function Notfound() {
  return (
    <div className='not-found'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist</p>
      <Link to='/'><button>Go Back Home</button></Link>
    </div>
  )
}

export default Notfound
