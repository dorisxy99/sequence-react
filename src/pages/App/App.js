import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import GamePage from "../GamePage/GamePage";
import WaitingRoom from "../WaitingRoom/WaitingRoom.jsx";


// import socket from './socket';

export default function App() {
  const [user, setUser] = useState(getUser());
  console.log(user);

  /*--- Lifecycle Methods */

  return (
    <div className="App">
      { user ?
          <NavBar user={user} setUser={setUser} />
          : null
      }

       <Routes>
           { user?
               <>
               {/* Route components in here */}
               <Route path="/match/:id" element={<GamePage user={user} />} />
               <Route path="/" element={<WaitingRoom user={user} />} />
               </>
               :
               <Route path="/" element={<AuthPage setUser={setUser} />} />
           }


        </Routes>
    </div>
  );
}