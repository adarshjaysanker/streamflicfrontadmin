import './App.css';
import AddVideos from './Pages/AddVideos';
import Explore from './Pages/Explore';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import Tvshows from './Pages/Tvshows';
import Users from './Pages/Users';
import Sidebar from './components/Sidebar/Sidebar';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SidebarProvider } from './useContext/SidebarContext';
import Notfound from './Pages/Notfound';

function App() {
  return (
   <SidebarProvider>
       <Router>
          <Sidebar/>
        <div className="App">           
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/addvideo" element={<AddVideos/>} />
                <Route path='/explore' element={<Explore/>}/>
                <Route path='/movies' element={<Movies/>}/>
                <Route path='/tvshows' element={<Tvshows/>}/>
                <Route path='/users' element={<Users/>}/>

                <Route path='*' element={<Notfound/>}/>
            </Routes>
        </div>
      </Router>
   </SidebarProvider>
   
  );
}

export default App;
