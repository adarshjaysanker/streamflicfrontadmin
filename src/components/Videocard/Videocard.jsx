import React from 'react';
import './videocard.css';

function Videocard({video}) {

  const imageUrl = `https://api.streamflics.xyz/${video.infoBanner}`
  console.log(imageUrl, 'adarsh');

  return (
    <div className='video-card'>
      <img src={`https://api.streamflics.xyz/${video.titleBanner}`} alt={video.title} className='video-image'/>
      <div className="video-details">
        <h2>{video.title}</h2>
        <p>{video.duration}</p>
        <p>{video.description}</p>
        <div className="button-container">
          <button className='view-button'>View</button>
        </div>
      </div>
    </div>
  )
}

export default Videocard