import React, { useEffect, useState } from 'react';
import './showvideo.css'
import Categoryshow from '../Categoryshow/Categoryshow';

function Showvideo() {

  const [categories, setCategories] = useState({});


 const fetchAllVideos = async() => {
  try{
    const response = await fetch('https://api.streamflics.xyz/admin/getallvideos',{
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
    setCategories(result)
  }catch(error){
    console.error(error);
  }
 }

  useEffect(() => {
    fetchAllVideos();
  },[])


  return (
    <div className='showvideo'>
      {Object.keys(categories).map((category) => (
        <Categoryshow key={category} title={category} videos={categories[category]}/>
      ))}
    </div>
  )
}

export default Showvideo