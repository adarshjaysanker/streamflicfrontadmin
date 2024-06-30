import React, { useEffect, useRef } from 'react';
import './categoryshow.css'
import Videocard from '../Videocard/Videocard';

function Categoryshow({title, videos}) {


    const videoListRef = useRef(null);

    const scrollLeft = () => {
        if(videoListRef.current){
           videoListRef.current.scrollBy({
            left: -videoListRef.current.offsetWidth,
            behavior: 'smooth'
           })
        }
    }

    const scrollRight = () => {
        if(videoListRef.current){
            videoListRef.current.scrollBy({
                left: videoListRef.current.offsetWidth,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if(videoListRef.current){
                videoListRef.current.scrollTo({left: 0, behavior: 'smooth'})
            }
        };
        window.addEventListener('resize', handleResize);
        return() => {
            window.removeEventListener('resize',handleResize)
        }
    }, []);

  return (
    <div className='category'>
        <h2 className='category-title'>{title}</h2>
        <div className="scroll-container">
            <div className="scroll-arrow left-arrow" onClick={scrollLeft}>
                <i class="fa-solid fa-arrow-left"></i>
            </div>
            <div className="video-list" ref={videoListRef}>
                {videos.map((video) => (
                    <Videocard key={video.id} video={video}/>
                ))}
            </div>
       
            <div className="scroll-arrow right-arrow" onClick={scrollRight}>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
      
    </div>
  )
}

export default Categoryshow