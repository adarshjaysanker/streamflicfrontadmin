import React from 'react'
import { Link } from 'react-router-dom'
import Showvideo from '../components/Showvideo/Showvideo'

function Explore() {
  return (
   <>
    <Link to='/addvideo'><button style={{marginTop: '20px', marginLeft: '1350px'}}>Add Video</button></Link>
      <div>
        <Showvideo/>
      </div> 
   </>
  )
}

export default Explore